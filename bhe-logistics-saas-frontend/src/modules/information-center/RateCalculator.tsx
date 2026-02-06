/** @format */

import { useState } from 'react';
import RateForm, { type RateFormValues } from './components/RateForm';
 import rateService, { type CarrierRate } from '../shipment/services/rate.service';

import '../../styles/RateCalculatorStyle/rate-calculator.css';
import RateSummaryPanel from './components/RateSummaryPanel';


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
		<div className="rate-calculator-page">
			<div className="rate-calculator-layout">
				{/* LEFT */}
				<div className="rate-left-panel">
					<RateForm onSubmit={handleSubmit} />
				</div>

				{/* RIGHT */}
				<div className="rate-right-panel">
					{isLoading && <p className="loading-text">Loading rates...</p>}
					{error && <p className="error-text">{error}</p>}
 					<RateSummaryPanel />
				</div>
			</div>
		</div>
	);
}

export default RateCalculator;
