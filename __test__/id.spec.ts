import supertest from "supertest";
import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import httpStatus, { HttpStatus } from "http-status";
import { uuidV4URL } from "../src/config";

import app from "../src/app";
import { FIXTURE_UUID, PATH_UID } from "./fixture";
import exp from "constants";

describe("uID endpoint", () => {
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
        return res(ctx.json([FIXTURE_UUID]));
      })
    );
    mockServer.listen();

    const response = await request.get(PATH_UID);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body.id).toEqual(FIXTURE_UUID);
  });

  it("should return 500 given low level is down", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (req, res, ctx) => {
        return res(ctx.status(httpStatus.INTERNAL_SERVER_ERROR));
      })
    );
    mockServer.listen();

    const response = await request.get(PATH_UID);

    expect(response.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toEqual(
      httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    );
  });
});
