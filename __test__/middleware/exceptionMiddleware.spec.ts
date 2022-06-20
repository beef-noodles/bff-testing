import InternalServerErrorException from "@/exceptions/InternalServerErrorException";
import httpStatus from "http-status";
import { Context } from "koa";

import exceptionMiddleware from "../../src/middleware/exceptionMiddleware";

describe("exceptionMiddleware", () => {
  it("should invoke next", async () => {
    const nextSpy = jest.fn();

    await exceptionMiddleware({} as unknown as Context, nextSpy);

    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 given InternalServerErrorException", async () => {
    const nextSpy = () => {
      throw new InternalServerErrorException("test");
    };

    const ctx = {} as unknown as Context;
    await exceptionMiddleware(ctx, nextSpy);

    expect(ctx.status).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(ctx.body).toMatchObject({
      status: "success",
      errors: [
        {
          info: "500",
          message: "test",
        },
      ],
    });
  });
});
