import logger from "../utils/loggerUtils";
export default class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    logger.error(`Internal server error, ${message}`);
  }
}
