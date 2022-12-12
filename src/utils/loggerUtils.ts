import log4js from "log4js";
import dotenv from "dotenv";

export const loggerFactory = () => {
  dotenv.config({
    path: `.env${process.env["NODE_ENV"] !== "prod" ? "" : ".prod"}`,
    override: true,
  });

  const logLevel = process.env["LOG_LEVEL"] || "info";

  log4js.configure({
    appenders: {
      pattern: {
        type: "stdout",
        layout: {
          type: "pattern",
          pattern: "%[%d [%p] [%h] [%z] %M(%C:%l)-%m%]",
        },
      },
    },
    categories: {
      default: {
        enableCallStack: true,
        appenders: ["pattern"],
        level: logLevel,
      },
    },
  });
  const logger = log4js.getLogger("pattern");

  return logger;
};

const logger = loggerFactory();

export default logger;
