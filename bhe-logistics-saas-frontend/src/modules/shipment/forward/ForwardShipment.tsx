/** @format */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	forwardShipmentSchema,
	type ForwardShipmentFormValues,
} from './forwardShipment.schema';
import shipmentService from '../services/shipment.service';

function ForwardShipment() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ForwardShipmentFormValues>({
		resolver: zodResolver(forwardShipmentSchema),
		mode: 'onChange',
		defaultValues: {
			originPincode: '',
			destinationPincode: '',
			weight: '',
			dimensions: {
				length: '',
				width: '',
				height: '',
			},
			carrier: '',
		},
	});

	const onSubmit = async (values: ForwardShipmentFormValues) => {
		setSubmitError(null);
		setIsSubmitting(true);
		try {
			await shipmentService.bookForwardShipment(values);
			navigate('/franchise/shipments/forward/confirmation', {
				replace: true,
			});
		} catch (error) {
			const status = (error as { response?: { status?: number } })?.response
				?.status;
			if (status === 402) {
				setSubmitError('Insufficient wallet balance.');
			} else {
				setSubmitError('Unable to book shipment. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{submitError && <p role="alert">{submitError}</p>}
			<div>
				<label htmlFor="originPincode">Origin pincode</label>
				<input
					id="originPincode"
					type="text"
					{...register('originPincode')}
					autoComplete="postal-code"
				/>
				{errors.originPincode && (
					<p role="alert">{errors.originPincode.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="destinationPincode">Destination pincode</label>
				<input
					id="destinationPincode"
					type="text"
					{...register('destinationPincode')}
					autoComplete="postal-code"
				/>
				{errors.destinationPincode && (
					<p role="alert">{errors.destinationPincode.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="weight">Weight</label>
				<input id="weight" type="text" {...register('weight')} />
				{errors.weight && <p role="alert">{errors.weight.message}</p>}
			</div>
			<fieldset>
				<legend>Dimensions</legend>
				<div>
					<label htmlFor="length">L</label>
					<input id="length" type="text" {...register('dimensions.length')} />
					{errors.dimensions?.length && (
						<p role="alert">{errors.dimensions.length.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="width">W</label>
					<input id="width" type="text" {...register('dimensions.width')} />
					{errors.dimensions?.width && (
						<p role="alert">{errors.dimensions.width.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="height">H</label>
					<input id="height" type="text" {...register('dimensions.height')} />
					{errors.dimensions?.height && (
						<p role="alert">{errors.dimensions.height.message}</p>
					)}
				</div>
			</fieldset>
			<div>
				<label htmlFor="carrier">Carrier selection</label>
				<select id="carrier" {...register('carrier')}>
					<option value="">Select a carrier</option>
					<option value="delhivery">Delhivery</option>
					<option value="dtdc">DTDC</option>
					<option value="bluedart">Blue Dart</option>
				</select>
				{errors.carrier && <p role="alert">{errors.carrier.message}</p>}
			</div>
			<button type="submit" disabled={!isValid || isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
		</form>
	);
}

export default ForwardShipment;
