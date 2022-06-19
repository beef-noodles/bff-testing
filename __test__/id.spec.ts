import supertest from "supertest";
import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { uuidV4URL } from "../src/config";

import app from "../src/app";

describe("uID endpoint", () => {
  const uuid = "533e50d3-5778-476e-b6f4-4b7e7cc37285";

  let mockServer: SetupServerApi;

  const request = supertest(app.callback());

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it("should return true for health endpoint", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (req, res, ctx) => {
        return res(ctx.json([uuid]));
      })
    );
    mockServer.listen();

    const response = await request.get("/v1/uid");

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toEqual(uuid);
  });
});
