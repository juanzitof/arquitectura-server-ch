export const config = {
	persistence: process.env.DB,
	mongodb: {
		url: process.env.mongoURI,
	},
	session: { secret: process.env.SESSION_SECRET },
	firebase: {
		type: process.env.TYPE,
		project_id: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
		client_email: process.env.CLIENT_EMAIL,
		client_id: process.env.CLIENT_ID,
		auth_uri: process.env.AUTH_URI,
		token_uri: process.env.TOKEN_URI,
		auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
	},
	mail: {
		MAIL_ETH_HOST: process.env.MAIL_ETH_HOST,
		MAIL_ETH_PORT: process.env.MAIL_ETH_PORT,
		MAIL_ETH_USER: process.env.MAIL_ETH_USER,
		MAIL_ETH_PASS: process.env.MAIL_ETH_PASS,
	},
	twilio: {
		accountSid: process.env.TWILIO_ACCOUNTSID,
		authToken: process.env.TWILIO_AUTHTOKEN,
	},
};