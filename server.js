import "dotenv/config";
import express, { json, urlencoded } from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import passport from "passport";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { Server as HttpServer } from "http";
import cluster from "cluster";
import os from "os";
import { config } from "./config/index.js";
import { logger } from "./utils/winston/index.js";
import productsRouter from "./routers/productsRouter.js";
import { cartRouter } from "./routers/cartsRouter.js";
import { webRouter } from "./routers/webRouter.js";
import orderRouter from "./routers/ordersRouter.js";
import userRouter from "./routers/usersRouter.js";
import yargObj from "./utils/yargs.js";
import compression from "compression";
import "./config/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Instancia de servidor -----
const app = express();
const httpServer = new HttpServer(app);

// ----- Configuración Server -----
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors(`${config.cors}`));
app.use(compression());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// ---- Session ----
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.mongodb.url,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000,
		},
	})
);

// ---- Passport ----

app.use(passport.initialize());
app.use(passport.session());

// ----- Rutas -----
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.use(userRouter);
app.use("/api/order", orderRouter);
app.use("/", webRouter);

const numCPUs = os.cpus().length;
const PORT = process.argv[2] || process.env.PORT || yargObj.port;
const mode =
	process.argv[3]?.toUpperCase() ||
	yargObj.mode.toUpperCase() ||
	process.env.MODE;

if (mode === "FORK") {
	const server = httpServer.listen(PORT, () => {
		logger.log(
			"info",
			`Server is up in port http://localhost:${PORT} || Worker ${process.pid} started!`
		);
	});
	server.on("error", (error) => logger.log("error", `Server error: ${error}`));
	process.on("exit", (code) => logger.log("info", `Exit code: ${code}`));
}

if (mode === "CLUSTER") {
	if (cluster.isPrimary) {
		logger.log("info", `Master -> PID: ${process.pid}`);

		// Workers
		logger.log("info", `CPUs: ${numCPUs}`);
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on("exit", (worker, code, signal) => {
			logger.log("warn", `Subprocess ${worker.process.pid} died!`);
			cluster.fork();
		});
	} else {
		const server = httpServer.listen(PORT, () => {
			logger.log(
				"info",
				`Server on port ${PORT} || Worker ${process.pid} started!`
			);
		});

		server.on("error", (error) =>
			logger.log("error", `Server error: ${error}`)
		);
		process.on("exit", (code) => logger.log("info", `Exit code: ${code}`));
	}
}