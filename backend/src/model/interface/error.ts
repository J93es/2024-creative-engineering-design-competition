export class AuthError implements Error {
  name: string = "AuthError";

  constructor(public message: string) {
    this.message = message ?? "Auth Error";
  }
}

export class AssertionError implements Error {
  name: string = "AssertionError";

  constructor(public message: string) {
    this.message = message ?? "Assertion Error";
  }
}

export class BadRequestError implements Error {
  name: string = "BadRequestError";

  constructor(public message: string) {
    this.message = message ?? "Bad Request Error";
  }
}