import bcrypt from "bcrypt";

const validPassword = async (password, userPassword) =>
	bcrypt.compare(password, userPassword);

export default validPassword;