/** @format */

import { z } from 'zod';

export const numericString = z
	.string()
	.trim()
	.min(1, 'Required')
	.regex(/^\d+$/, 'Must be numeric');

export const positiveNumberString = z
	.string()
	.trim()
	.min(1, 'Required')
	.refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
		message: 'Must be a positive number',
	});

export const forwardShipmentSchema = z.object({
	originPincode: numericString,
	destinationPincode: numericString,
	weight: positiveNumberString,
	dimensions: z.object({
		length: positiveNumberString,
		width: positiveNumberString,
		height: positiveNumberString,
	}),
	carrier: z.string().trim().min(1, 'Carrier is required'),
});

export type ForwardShipmentFormValues = z.infer<typeof forwardShipmentSchema>;
