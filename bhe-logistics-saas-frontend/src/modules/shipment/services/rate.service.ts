/** @format */

import api from '../../../services/api';
import type { RateCalculatorFormValues } from '../../information-center/rateCalculator.schema';

export type CarrierRate = {
	carrier: string;
	rate: number;
	estimatedDeliveryDays?: number;
};

type RateResponse = {
	rates: CarrierRate[];
};

const rateService = {
	async calculateRates(payload: RateCalculatorFormValues) {
		const response = await api.post<RateResponse>('/rates/calculate', payload);
		return response.data.rates;
	},
};

export default rateService;
