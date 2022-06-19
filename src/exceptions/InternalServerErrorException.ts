export default class InternalServerErrorException extends Error {
  constructor(message: string) {
    super();
    console.error(`Internal server error, error: ${message}`);
  }
}
