import { ExpressApp } from ".";
import { DummyDAO, SequelizeDAO, sequelize } from "../../dao";
import { testAPI } from "../utils-test";

testAPI({
  name: "Express / DummyDAO",
  createServer: () => {
    const expressApp = new ExpressApp(DummyDAO);
    return expressApp.app;
  },
});

testAPI({
  name: "Express / Sequelize (PostgreSQL)",
  createServer: () => {
    const expressApp = new ExpressApp(SequelizeDAO);
    return expressApp.app;
  },
  afterAll: () => {
    sequelize.close();
  },
});
