const axios = require("axios");
const logger = require("../utils/logger");

const beerApi = process.env.APP_BEER_API;

const getBeers = async (ctx, next) => {
  // Log
  const { request } = ctx;
  let log = {
    url: request.url,
    method: request.method,
    host: request.header ? request.header["host"] : undefined,
    userAgent: request.header ? request.header["user-agent"] : undefined,
  };
  ctx.set("Content-Type", "application/json");

  // Check beers
  if (beerApi) {
    const res = await axios.get(beerApi);
    const beers = res.data;
    log = { ...log, beers };
    logger.log(log);

    ctx.status = 200;
    ctx.body = JSON.stringify(res.data);
  }

  // Return
  else {
    const noBeer = [{ name: "No beers" }];
    log = { ...log, beers: noBeer };
    logger.log(log);

    ctx.status = 200;
    ctx.body = JSON.stringify(noBeer);
  }
};

const handle404 = async (ctx, next) => {
  // Log
  const { request } = ctx;
  let log = {
    url: request.url,
    method: request.method,
    host: request.header ? request.header["host"] : undefined,
    userAgent: request.header ? request.header["user-agent"] : undefined,
    error: "URL not handled",
  };
  logger.log(log);

  ctx.status = 404;
  ctx.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({ err: "This URL is not handled yet." });

  next();
};

const getLogs = async (ctx, next) => {
  const { request } = ctx;
  let log = {
    url: request.url,
    method: request.method,
    host: request.header ? request.header["host"] : undefined,
    userAgent: request.header ? request.header["user-agent"] : undefined,
  };
  logger.log(log);

  const data = await logger.fetchLogs();
  // Error handling is out of scope here...
  ctx.status = 200;
  ctx.body = data;
};

module.exports = {
  getBeers,
  handle404,
  getLogs,
};
