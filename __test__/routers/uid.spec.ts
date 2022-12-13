import supertest from "supertest";
import httpStatus from "http-status";

import app from "@/app";
import { uidService } from "@/services/UidService";
import { FIXTURE_UUID, PATH_UID } from "../fixture";
import InternalServerErrorException from "@/exceptions/InternalServerErrorException";

jest.mock("@/services/UidService");

describe("uid endpoint", () => {
  const request = supertest(app.callback());

  const getUidSpy = jest.spyOn(uidService, "getUid");

  beforeEach(() => {
    getUidSpy.mockRestore();
  });

  it("should return UUID given uidService return result", async () => {
    getUidSpy.mockResolvedValue({
      id: FIXTURE_UUID,
    });

    const response = await request.get(PATH_UID);

    expect(httpStatus.CREATED).toEqual(response.statusCode);
    expect(response.body.id).toEqual(FIXTURE_UUID);
  });

  it("should return 500 given low level is down", async () => {
    getUidSpy.mockRejectedValue(new InternalServerErrorException("failed"));

    const response = await request.get(PATH_UID);

    expect(response.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toEqual(
      httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    );
  });
});
