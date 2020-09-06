import request from "supertest";

import { ROUTES, PARAM } from "./routes";
import { beers, countries } from "../dao/data";
import { Beer, CountryCode } from "../dao";
import { DeleteResponse } from "../handlers";

export interface testAPIConfig {
  name: string;
  createServer: () => any;
  beforeAll?: () => void;
  afterAll?: () => void;
}

/**
 * Test all endpoints given an application implementation. As an application
 * combines a web framework and a DAO library, it is expected that the test
 * suite name reflects the two components
 *
 * @param config Testing configuration
 */
export const testAPI = (config: testAPIConfig) => {
  let server: any;

  beforeAll(() => {
    // no need to call .listen() or .start()
    server = config.createServer();

    if (config.beforeAll) {
      config.beforeAll();
    }
  });

  afterAll(() => {
    if (config.afterAll) {
      config.afterAll();
    }
  });

  describe(config.name, () => {
    describe("Beers", () => {
      it("List", async () => {
        const resp = await request(server)
          .get(ROUTES.BEERS.LIST)
          .expect("Content-Type", /json/)
          .expect(200);

        // The list
        const list = resp.body as Beer[];
        expect(list.length).toBe(beers.length);

        const hasSameProp = (b1: Beer) => (b2: Beer): boolean => {
          return b1.country === b2.country && b1.name === b2.name;
        };

        for (let beer of list) {
          expect(beers.some(hasSameProp(beer)));
        }
        for (let beer of beers) {
          expect(list.some(hasSameProp(beer)));
        }
      });

      describe("Creates", () => {
        it("Works", async () => {
          const name: string = "Prout";
          const country: CountryCode = "be";

          const resp = await request(server)
            .post(ROUTES.BEERS.CREATE)
            .send({ name, country })
            .expect("Content-Type", /json/)
            .expect(200);

          const newBeer = resp.body as Beer;
          expect(newBeer.id).toBeDefined();
          expect(newBeer.name).toBe(name);
          expect(newBeer.country).toBe(country);
        });

        it.skip("Reject invalid country with 404", async () => {
          const name: string = "Prout";
          const country: string = "invalid-country-code";

          await request(server)
            .post(ROUTES.BEERS.CREATE)
            .send({ name, country })
            .expect(404);
        });
      });

      describe("Get", () => {
        it("Works", async () => {
          const listResp = await request(server)
            .get(ROUTES.BEERS.LIST)
            .expect(200);
          const list = listResp.body as Beer[];
          expect(list.length).toBeGreaterThan(0);

          const someId = list[0].id;
          const getResp = await request(server)
            .get(ROUTES.BEERS.GET.replace(PARAM.BEERS.ID, someId))
            .expect("Content-Type", /json/)
            .expect(200);
          const beer = getResp.body as Beer;

          expect(beer).toEqual(list[0]);
        });

        it("Returns 404 for an invalid beerId", async () => {
          await request(server)
            .get(ROUTES.BEERS.GET.replace(PARAM.BEERS.ID, "some-impossible-id"))
            .expect(404);
        });
      });

      describe("Delete", () => {
        it("Works", async () => {
          const listResp = await request(server)
            .get(ROUTES.BEERS.LIST)
            .expect(200);
          const list = listResp.body as Beer[];
          expect(list.length).toBeGreaterThan(0);

          const someId = list[list.length - 1].id;
          const deleteResp = await request(server)
            .delete(ROUTES.BEERS.DELETE.replace(PARAM.BEERS.ID, someId))
            .expect(200);

          const expected: DeleteResponse = { deleteCount: 1 };
          expect(deleteResp.body).toEqual(expected);
        });

        it("Returns 200 for an invalid beerId but with zero deleted count", async () => {
          const deleteResp = await request(server)
            .delete(ROUTES.BEERS.DELETE.replace(PARAM.BEERS.ID, "some-id"))
            .expect(200);

          const expected: DeleteResponse = { deleteCount: 0 };
          expect(deleteResp.body).toEqual(expected);
        });
      });
    });
  });
};
