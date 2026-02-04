/** @format */

import type { CarrierRate } from '../../shipment/services/rate.service';

type RateResultTableProps = {
	results: CarrierRate[];
	onSelect?: (carrier: CarrierRate) => void;
};

function RateResultTable({ results, onSelect }: RateResultTableProps) {
	return (
		<section>
			<h2>Rate Results</h2>
			<table>
				<thead>
					<tr>
						<th>Carrier</th>
						<th>Price</th>
						<th>Delivery Days</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{results.map((result) => (
						<tr key={result.carrier}>
							<td>{result.carrier}</td>
							<td>{result.rate}</td>
							<td>{result.estimatedDeliveryDays ?? 0}</td>
							<td>
								<button type="button" onClick={() => onSelect?.(result)}>
									Select Carrier
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export default RateResultTable;
