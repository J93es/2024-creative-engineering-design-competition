export class AuthError implements Error {
  name: string = "AuthError";

  constructor(public message: string) {
    this.message = message;
  }
}
