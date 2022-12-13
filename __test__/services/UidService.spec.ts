import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import httpStatus from "http-status";
import { uuidV4URL } from "@/config";

import { FIXTURE_UUID } from "../fixture";
import InternalServerErrorException from "@/exceptions/InternalServerErrorException";
import { uidService, UidResponse } from "@/services/UidService";

describe("UidService.spec.ts", () => {
  let mockServer: SetupServerApi;

  afterEach(() => {
    mockServer.restoreHandlers();
    mockServer.close();
  });

  it("should return uid when get uid", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (_req, res, ctx) => {
        return res(ctx.json([FIXTURE_UUID]));
      })
    );
    mockServer.listen();

    const uidResponse: UidResponse = await uidService.getUid();

    expect(uidResponse.id).toEqual(FIXTURE_UUID);
  });

  it("should throw exception given low level is down", async () => {
    mockServer = setupServer(
      rest.get(uuidV4URL, (_req, res, ctx) => {
        return res(ctx.status(httpStatus.INTERNAL_SERVER_ERROR));
      })
    );
    mockServer.listen();

    await expect(uidService.getUid()).rejects.toThrow(
      InternalServerErrorException
    );
  });
});
