import { loggerFactory } from "../../src/utils/loggerUtils";
import dotenv, { DotenvConfigOutput } from "dotenv";

describe("logger", () => {
  const oldEnv = process.env;

  afterEach(() => {
    process.env = oldEnv;
  });

  describe("real env test", () => {
    it("should set DEBUG log level given NODE_EVN is test in env", () => {
      process.env["NODE_ENV"] = "test";
      process.env["LOG_LEVEL"] = "debug";

      const logger = loggerFactory();

      expect(logger.level).toMatchObject({
        colour: "cyan",
        level: 10000,
        levelStr: "DEBUG",
      });
    });

    it("should set INFO log level given NODE_ENV is prod in env", () => {
      process.env["NODE_ENV"] = "prod";

      const logger = loggerFactory();

      expect(logger.level).toMatchObject({
        colour: "green",
        level: 20000,
        levelStr: "INFO",
      });
    });
  });

  describe("mock env test", () => {
    beforeEach(() => {
      jest.spyOn(dotenv, "config").mockImplementation(() => {
        return {} as DotenvConfigOutput;
      });
    });

    it("should set INFO log level given LOG_LEVEL is test in env", () => {
      process.env["NODE_ENV"] = "test";
      process.env["LOG_LEVEL"] = "";

      const logger = loggerFactory();

      expect(logger.level).toMatchObject({
        colour: "green",
        level: 20000,
        levelStr: "INFO",
      });
    });
  });
});
