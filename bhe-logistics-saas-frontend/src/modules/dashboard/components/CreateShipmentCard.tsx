/** @format */

import type { MouseEventHandler } from 'react';

type CreateShipmentCardProps = {
	title: string;
	description: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

function CreateShipmentCard({
	title,
	description,
	onClick,
}: CreateShipmentCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
			<div className="space-y-1">
				<h3 className="text-base font-semibold text-slate-900">{title}</h3>
				<p className="text-sm text-slate-600">{description}</p>
			</div>
		</button>
	);
}

export default CreateShipmentCard;
