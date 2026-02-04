/** @format */

function ActionRequired() {
	return (
		<section className="space-y-3">
			<h3 className="text-lg font-semibold text-slate-900">Action Required</h3>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
					<p className="text-xs font-medium uppercase text-amber-700">
						Pending pickups
					</p>
					<p className="mt-1 text-2xl font-semibold text-amber-900">0</p>
				</div>
				<div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
					<p className="text-xs font-medium uppercase text-amber-700">
						Failed shipments
					</p>
					<p className="mt-1 text-2xl font-semibold text-amber-900">0</p>
				</div>
				<div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
					<p className="text-xs font-medium uppercase text-amber-700">NDR</p>
					<p className="mt-1 text-2xl font-semibold text-amber-900">0</p>
				</div>
			</div>
		</section>
	);
}

export default ActionRequired;
