import yarg from "yargs";

let options = {
	default: {
		persistence: "MONGO",
		port: 8080,
		mode: "FORK",
	},
	alias: {
		p: "port",
		m: "mode",
	},
};

const yargObj = yarg(process.argv.slice(2))
	.default(options.default)
	.alias(options.alias).argv;

export default yargObj;