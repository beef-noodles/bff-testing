import axios from "axios";

import { requestTimeout, uuidV4URL } from "../config";
import InternalServerErrorException from "../exceptions/InternalServerErrorException";

type UUIDResponse = [string];
export type UidResponse = {
  id: string;
};

export const getUid = async (): Promise<UidResponse> => {
  try {
    const response = await axios.get(uuidV4URL, {
      timeout: requestTimeout,
    });
    const result = (await response.data) as UUIDResponse;

    return { id: result[0] };
  } catch (error) {
    const errorMessage = `Failed to request uuid, error: ${error}`;
    throw new InternalServerErrorException(errorMessage);
  }
};
