/** @format */

import { z } from 'zod';

const positiveNumberString = z
	.string()
	.trim()
	.min(1, 'Required')
	.refine(
		(value) => {
			const parsed = Number(value);
			return Number.isFinite(parsed) && parsed > 0;
		},
		{ message: 'Must be a positive number' }
	);

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
