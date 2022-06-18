import supertest from "supertest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { uuidV4URL } from "../src/config";

import app from "../src/app";

describe("uID endpoint", () => {
  const uuid = "533e50d3-5778-476e-b6f4-4b7e7cc37285";

  const mockServer = setupServer(
    rest.get(uuidV4URL, (req, res, ctx) => {
      return res(ctx.json([uuid]));
    })
  );

  const request = supertest(app.callback());

  beforeAll(() => {
    mockServer.listen();
  });
  beforeEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it("should return true for health endpoint", async () => {
    const response = await request.get("/v1/uid");

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toEqual(uuid);
  });
});
