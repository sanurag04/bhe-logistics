/** @format */

import { useForm } from 'react-hook-form';

export type RateFormValues = {
	origin: string;
	destination: string;
	weight: string;
	dimensions: {
		length: string;
		width: string;
		height: string;
	};
};

type RateFormProps = {
	onSubmit: (values: RateFormValues) => void;
};

function RateForm({ onSubmit }: RateFormProps) {
	const { register, handleSubmit } = useForm<RateFormValues>({
		defaultValues: {
			origin: '',
			destination: '',
			weight: '',
			dimensions: {
				length: '',
				width: '',
				height: '',
			},
		},
	});

	return (
		<section>
			<h2>Rate Form</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="origin">Origin</label>
					<input id="origin" type="text" {...register('origin')} />
				</div>
				<div>
					<label htmlFor="destination">Destination</label>
					<input id="destination" type="text" {...register('destination')} />
				</div>
				<div>
					<label htmlFor="weight">Weight</label>
					<input id="weight" type="text" {...register('weight')} />
				</div>
				<fieldset>
					<legend>Dimensions</legend>
					<div>
						<label htmlFor="length">L</label>
						<input id="length" type="text" {...register('dimensions.length')} />
					</div>
					<div>
						<label htmlFor="width">W</label>
						<input id="width" type="text" {...register('dimensions.width')} />
					</div>
					<div>
						<label htmlFor="height">H</label>
						<input id="height" type="text" {...register('dimensions.height')} />
					</div>
				</fieldset>
				<button type="submit">Get Rate</button>
			</form>
		</section>
	);
}

export default RateForm;
