import twilio from "twilio";
import { config } from "../config/index.js";
import { logger } from "./winston/index.js";

const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;

const client = twilio(accountSid, authToken, {
	lazyLoading: true,
});

export const checkOutSms = async (userPhone) => {
	try {
		const message = await client.messages.create({
			body: "Tu pedido ha sido recibido y se encuentra en proceso!",
			from: "+19894410301",
			to: `+549${userPhone}`,
		});
		logger.log(message);
	} catch (err) {
		logger.log(err);
	}
};
export const checkOutWhatsapp = async (order, userPhone) => {
	try {
		const message = await client.messages.create({
			body: `nuevo pedido de ${order.userName}, ${order.userEmail}`,
			from: "whatsapp:+14155238886",
			to: `whatsapp:+549${userPhone}`,
		});
		logger.log(message);
	} catch (err) {
		logger.log(`error al enviar whatsapp: ${err}`);
	}
};