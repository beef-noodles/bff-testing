import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import httpStatus from "http-status";
import { uuidV4URL } from "../../src/config";

import { getUid, UidResponse } from "../../src/services/UidService";
import { FIXTURE_UUID } from "../fixture";
import InternalServerErrorException from "../../src/exceptions/InternalServerErrorException";

describe("uID endpoint", () => {
  let mockServer: SetupServerApi;

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it("should return true for health endpoint", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (_req, res, ctx) => {
        return res(ctx.json([FIXTURE_UUID]));
      })
    );
    mockServer.listen();

    const uidResponse: UidResponse = await getUid();

    expect(uidResponse.id).toEqual(FIXTURE_UUID);
  });

  it("should return throw exception given low level is down", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (_req, res, ctx) => {
        return res(ctx.status(httpStatus.INTERNAL_SERVER_ERROR));
      })
    );
    mockServer.listen();

    expect.assertions(1);
    try {
      await getUid();
    } catch (error) {
      expect(error).toEqual(new InternalServerErrorException("error"));
    }
  });
});
