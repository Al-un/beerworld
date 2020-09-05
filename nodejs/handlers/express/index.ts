import { HandlerBuilder, AllHandlers } from "../models";
import { ExpressBeerHandler } from "./beers";

export const ExpressHandler: HandlerBuilder<AllHandlers> = (dao) => ({
  beer: ExpressBeerHandler(dao),
});
