export default class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    console.error(`Internal server error, error: ${message}`);
  }
}
