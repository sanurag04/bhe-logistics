import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '../user.entity';

@Injectable()
export class FranchiseAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // SUPER_ADMIN can access all franchises
    if (user.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    // Get franchiseId from route params
    const franchiseId = request.params.franchiseId || request.params.id;

    if (!franchiseId) {
      // If no franchiseId in params, allow (for endpoints that don't specify franchise)
      return true;
    }

    // Check if user's franchise matches
    if (user.franchiseId !== franchiseId) {
      throw new ForbiddenException(
        'Access denied: You can only access your own franchise data',
      );
    }

    return true;
  }
}
