/** @format */

export type RateRequest = {
	originPincode: string;
	destinationPincode: string;
	weight: string;
	dimensions: {
		length: string;
		width: string;
		height: string;
	};
};

export type RateResult = {
	carrier: string;
	rate: number;
	estimatedDeliveryDays?: number;
};
