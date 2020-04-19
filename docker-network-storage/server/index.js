// ----- IMPORTS
const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");

const services = require("./services");

// ----- CONFIG
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

// https://github.com/koajs/router/blob/master/API.md#exp_module_koa-router--Router
router.get("/", services.getBeers);
router.get("/logs", services.getLogs);
router.get("*", services.handle404);

app
  .use(cors({ origin: "*", allowHeaders: "*", allowMethods: "*" }))
  .use(router.routes())
  .use(router.allowedMethods());

// ------ RUN!
app.listen(PORT, HOST);
console.log(`Listen to port http://${HOST}:${PORT}...`);
