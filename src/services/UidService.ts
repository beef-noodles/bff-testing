import logger from "../utils/loggerUtils";
import axios from "axios";

import { requestTimeout, uuidV4URL } from "../config";
import InternalServerErrorException from "../exceptions/InternalServerErrorException";

type UUIDResponse = [string];
export type UidResponse = {
  id: string;
};

class UidService {
  async getUid(): Promise<UidResponse> {
    logger.info(`Start to do get uid from url: ${uuidV4URL}`);
    try {
      const response = await axios.get(uuidV4URL, {
        timeout: requestTimeout,
      });
      const result = (await response.data) as UUIDResponse;
      logger.info(`Successfully get UUID response: ${result}`);
      return { id: result[0] };
    } catch (error) {
      const errorMessage = `Failed to request uuid, error: ${error}`;
      throw new InternalServerErrorException(errorMessage);
    }
  }
}

export const uidService = new UidService();
