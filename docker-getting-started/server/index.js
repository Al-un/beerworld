// ----- IMPORTS
const Koa = require("koa");
const cors = require("@koa/cors");
const services = require("./services");

// ----- CONFIG
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const app = new Koa();
app.use(cors({ origin: "*", allowHeaders: "*", allowMethods: "*" }));

app.use(async ctx => {
  const payload = await services.getBeers();
  ctx.body = JSON.stringify(payload);
});

// For information only
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  console.debug(`Using DATABASE_URL ${dbUrl}`);
} else {
  console.debug(`Not Using DATABASE_URL`);
}

// ------ RUN!
app.listen(PORT, HOST);
console.log(`Listen to port http://${HOST}:${PORT}...`);
