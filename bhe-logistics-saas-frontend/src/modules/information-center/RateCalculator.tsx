/** @format */

import { useState } from 'react';
import RateForm, { type RateFormValues } from './components/RateForm';
import RateResultTable from './components/RateResultTable';
import rateService, {
	type CarrierRate,
} from '../shipment/services/rate.service';

function RateCalculator() {
	const [results, setResults] = useState<CarrierRate[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (values: RateFormValues): Promise<void> => {
		setError(null);
		setIsLoading(true);
		try {
			const rates = await rateService.calculateRates({
				originPincode: values.origin,
				destinationPincode: values.destination,
				weight: values.weight,
				dimensions: values.dimensions,
			});
			setResults(rates);
		} catch {
			setError('Unable to fetch rates. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<header>
				<h1>Rate Calculator</h1>
			</header>
			<RateForm onSubmit={handleSubmit} />
			{isLoading && <p>Loading rates...</p>}
			{error && <p role="alert">{error}</p>}
			<RateResultTable results={results} />
		</div>
	);
}

export default RateCalculator;
