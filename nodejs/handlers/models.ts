export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface Endpoint<H> {
  path: string;
  method: HttpMethod;
  handler: H;
}

export interface Handler {
  createBeer: any;

  deleteBeer: any;

  getBeer: any;

  listBeers: any;

  updateBeer: any;
}
