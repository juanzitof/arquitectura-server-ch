import { createTransport } from "nodemailer";
import { config } from "../config/index.js";

const transporter = createTransport({
	host: config.mail.MAIL_ETH_HOST,
	port: config.mail.MAIL_ETH_PORT,
	auth: {
		user: config.mail.MAIL_ETH_USER,
		pass: config.mail.MAIL_ETH_PASS,
	},
});

export const signUpEmail = async (newUser) => {
	const mailOptions = {
		from: "register@center.com",
		to: newUser.email,
		subject: "nuevo registro",
		html: `<h1>Nuevo Usuario</h1>
      <p>Mail: ${newUser.email}</p>
      <p>Nombre: ${newUser.name}</p>
      <p>Dirección: ${newUser.address}</p>
      <p>Fecha de Nacimiento: ${newUser.birthDate}</p>
      <p>Teléfono: ${newUser.phone}</p>
      `,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger.error(`Error al enviar email de registro. ${err}`);
	}
};

export const checkOutEmail = async (newOrder) => {
	const mailOptions = {
		from: "orders@center.com",
		to: newOrder.userEmail,
		subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
		html: `<h1>Pedido</h1>
      ${newOrder.products.map(
				(order) => `<li>${order.product}, cantidad: ${order.quantity}</li>`
			)}
      `,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger.error(`Error al enviar email de pedido. ${err}`);
	}
};