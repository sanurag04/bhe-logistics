import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Wallet, WalletStatus } from './wallet.entity';
import {
  WalletTransaction,
  TransactionType,
  TransactionStatus,
} from './wallet-transaction.entity';
import {
  BusinessException,
  PaymentRequiredException,
  ConflictException,
  ServiceUnavailableException,
} from '../common/exceptions/business.exceptions';

export interface DeductWalletResult {
  success: boolean;
  transactionId?: string;
  newBalance?: number;
  error?: string;
}

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransaction)
    private transactionRepository: Repository<WalletTransaction>,
    private dataSource: DataSource,
  ) {}

  async getWalletByFranchiseId(franchiseId: string): Promise<Wallet> {
    try {
      this.logger.debug(`Getting wallet for franchise ${franchiseId}`);
      const wallet = await this.walletRepository.findOne({
        where: { franchiseId },
      });

      if (!wallet) {
        this.logger.warn(`Wallet not found for franchise ${franchiseId}`);
        throw new NotFoundException('Wallet', `franchise ${franchiseId}`);
      }

      this.logger.log(`Wallet found for franchise ${franchiseId}`);
      return wallet;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to get wallet for franchise ${franchiseId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        'Failed to retrieve wallet. Please try again later.',
      );
    }
  }

  async getWalletBalance(franchiseId: string): Promise<number> {
    try {
      this.logger.debug(`Getting wallet balance for franchise ${franchiseId}`);
      const wallet = await this.getWalletByFranchiseId(franchiseId);
      this.logger.log(
        `Wallet balance for franchise ${franchiseId}: ${wallet.balance}`,
      );
      return wallet.balance;
    } catch (error) {
      this.logger.error(
        `Failed to get wallet balance for franchise ${franchiseId}: ${error.message}`,
        error.stack,
      );
      throw error; // Re-throw the error from getWalletByFranchiseId
    }
  }

  async createWallet(
    franchiseId: string,
    initialBalance = 0,
    creditLimit = 0,
  ): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      franchiseId,
      balance: initialBalance,
      creditLimit,
    });

    return this.walletRepository.save(wallet);
  }

  async deductAmount(
    franchiseId: string,
    amount: number,
    referenceId?: string,
    description?: string,
  ): Promise<DeductWalletResult> {
    const startTime = Date.now();

    try {
      this.logger.log(
        `Starting wallet deduction: franchise ${franchiseId}, amount ${amount}, reference ${referenceId || 'none'}`,
      );

      if (amount <= 0) {
        this.logger.warn(`Invalid deduction amount: ${amount}`);
        return {
          success: false,
          error: 'Amount must be greater than 0',
        };
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Get wallet with lock for update
        this.logger.debug(`Locking wallet for franchise ${franchiseId}`);
        const wallet = await queryRunner.manager.findOne(Wallet, {
          where: { franchiseId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!wallet) {
          this.logger.error(`Wallet not found for franchise ${franchiseId}`);
          throw new NotFoundException('Wallet', `franchise ${franchiseId}`);
        }

        if (wallet.status !== WalletStatus.ACTIVE) {
          this.logger.warn(
            `Wallet for franchise ${franchiseId} is not active (status: ${wallet.status})`,
          );
          throw new ConflictException(`Wallet is not active`);
        }

        const availableBalance = wallet.balance + wallet.creditLimit;
        if (availableBalance < amount) {
          this.logger.warn(
            `Insufficient funds for franchise ${franchiseId}: available ${availableBalance}, required ${amount}`,
          );
          throw new PaymentRequiredException(
            `Insufficient funds. Available: ${availableBalance}, Required: ${amount}`,
          );
        }

        const balanceBefore = wallet.balance;
        wallet.balance -= amount;
        const balanceAfter = wallet.balance;

        this.logger.debug(
          `Deducting ${amount} from wallet ${wallet.id}: ${balanceBefore} -> ${balanceAfter}`,
        );

        // Create transaction record
        const transaction = queryRunner.manager.create(WalletTransaction, {
          walletId: wallet.id,
          type: TransactionType.DEBIT,
          amount,
          balanceBefore,
          balanceAfter,
          status: TransactionStatus.COMPLETED,
          referenceId,
          description: description || `Shipment booking deduction`,
        });

        // Save both wallet and transaction in the same transaction
        await queryRunner.manager.save(wallet);
        const savedTransaction = await queryRunner.manager.save(transaction);

        await queryRunner.commitTransaction();

        this.logger.log(
          `Wallet deduction completed successfully in ${Date.now() - startTime}ms. Transaction ID: ${savedTransaction.id}, new balance: ${balanceAfter}`,
        );

        return {
          success: true,
          transactionId: savedTransaction.id,
          newBalance: balanceAfter,
        };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error(
          `Wallet deduction failed for franchise ${franchiseId}: ${error.message}`,
          error.stack,
        );

        if (error instanceof BusinessException) {
          return {
            success: false,
            error: error.message,
          };
        }

        return {
          success: false,
          error: 'An unexpected error occurred during wallet deduction',
        };
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      this.logger.error(
        `Unexpected error in deductAmount for franchise ${franchiseId}: ${error.message}`,
        error.stack,
      );
      return {
        success: false,
        error: 'Service temporarily unavailable. Please try again later.',
      };
    }
  }

  async addAmount(
    franchiseId: string,
    amount: number,
    referenceId?: string,
    description?: string,
  ): Promise<WalletTransaction> {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const wallet = await queryRunner.manager.findOne(Wallet, {
        where: { franchiseId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!wallet) {
        throw new NotFoundException(
          `Wallet not found for franchise ${franchiseId}`,
        );
      }

      if (wallet.status !== WalletStatus.ACTIVE) {
        throw new BadRequestException(`Wallet is not active`);
      }

      const balanceBefore = wallet.balance;
      wallet.balance += amount;
      const balanceAfter = wallet.balance;

      const transaction = queryRunner.manager.create(WalletTransaction, {
        walletId: wallet.id,
        type: TransactionType.CREDIT,
        amount,
        balanceBefore,
        balanceAfter,
        status: TransactionStatus.COMPLETED,
        referenceId,
        description: description || `Wallet credit`,
      });

      await queryRunner.manager.save(wallet);
      const savedTransaction = await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();
      return savedTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTransactionHistory(
    franchiseId: string,
    limit = 50,
    offset = 0,
  ): Promise<WalletTransaction[]> {
    const wallet = await this.getWalletByFranchiseId(franchiseId);

    return this.transactionRepository.find({
      where: { walletId: wallet.id },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async rollbackTransaction(transactionId: string): Promise<void> {
    const startTime = Date.now();

    this.logger.log(
      `Starting transaction rollback for transaction ${transactionId}`,
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transaction = await queryRunner.manager.findOne(WalletTransaction, {
        where: { id: transactionId },
        relations: ['wallet'],
      });

      if (!transaction) {
        this.logger.error(
          `Transaction ${transactionId} not found for rollback`,
        );
        throw new NotFoundException('Transaction', transactionId);
      }

      if (transaction.status !== TransactionStatus.COMPLETED) {
        this.logger.warn(
          `Transaction ${transactionId} is not in completed state (status: ${transaction.status})`,
        );
        throw new ConflictException(`Transaction is not in completed state`);
      }

      // Reverse the transaction
      const wallet = transaction.wallet;
      const balanceBefore = wallet.balance;

      if (transaction.type === TransactionType.DEBIT) {
        wallet.balance += transaction.amount; // Refund debit
      } else {
        wallet.balance -= transaction.amount; // Reverse credit
      }

      const balanceAfter = wallet.balance;

      this.logger.debug(
        `Rolling back transaction ${transactionId}: wallet ${wallet.id} balance ${balanceBefore} -> ${balanceAfter}`,
      );

      // Mark original transaction as cancelled
      transaction.status = TransactionStatus.CANCELLED;

      // Create reversal transaction
      const reversalTransaction = queryRunner.manager.create(
        WalletTransaction,
        {
          walletId: wallet.id,
          type:
            transaction.type === TransactionType.DEBIT
              ? TransactionType.CREDIT
              : TransactionType.DEBIT,
          amount: transaction.amount,
          balanceBefore,
          balanceAfter,
          status: TransactionStatus.COMPLETED,
          referenceId: transaction.referenceId,
          description: `Reversal of transaction ${transactionId}`,
          metadata: { reversedTransactionId: transactionId },
        },
      );

      await queryRunner.manager.save(wallet);
      await queryRunner.manager.save(transaction);
      const savedReversal = await queryRunner.manager.save(reversalTransaction);

      await queryRunner.commitTransaction();

      this.logger.log(
        `Transaction rollback completed successfully in ${Date.now() - startTime}ms. Reversal transaction ID: ${savedReversal.id}`,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof BusinessException) {
        throw error;
      }

      this.logger.error(
        `Failed to rollback transaction ${transactionId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        `Failed to rollback transaction ${transactionId}. Please contact support.`,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
