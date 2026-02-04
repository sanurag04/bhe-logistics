/** @format */

import { z } from 'zod';
import { positiveNumberString } from '../shipment/forward/forwardShipment.schema';

const pincodeString = z
	.string()
	.trim()
	.min(1, 'Required')
	.regex(/^\d{6}$/, 'Must be a 6-digit pincode');

export const rateCalculatorSchema = z.object({
	originPincode: pincodeString,
	destinationPincode: pincodeString,
	weight: positiveNumberString,
	dimensions: z.object({
		length: positiveNumberString,
		width: positiveNumberString,
		height: positiveNumberString,
	}),
});

export type RateCalculatorFormValues = z.infer<typeof rateCalculatorSchema>;
