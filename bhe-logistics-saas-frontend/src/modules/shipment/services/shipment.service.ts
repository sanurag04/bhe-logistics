/** @format */

import api from '../../../services/api';
import type { ForwardShipmentFormValues } from '../forward/forwardShipment.schema';

const shipmentService = {
	bookForwardShipment(payload: ForwardShipmentFormValues) {
		return api.post('/shipment/book', payload);
	},
};

export default shipmentService;
