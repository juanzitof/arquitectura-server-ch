import Users from "../schema/user.schema.js";

const isRegistered = async (req, res, next) => {
	const { email } = req.body;
	const exists = await Users.find({ email: email });
	if (exists.length) {
		res.render("signup-registered-user");
		return;
	}
	next();
};

export default isRegistered;