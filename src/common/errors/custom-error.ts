import { HttpStatus } from "@nestjs/common";
import { ErrorResponseType } from "./error-response.type";

export class CustomError {
  error: ErrorErrorData;
  status: HttpStatus;

  constructor(error: ErrorErrorData, status?: HttpStatus) {
    this.error = error;
    this.status = status;
  }

  withoutStatus(): CustomError {
    return new CustomError(this.error);
  }

  public static fromResponse({ error }: ErrorResponseType, status: HttpStatus): CustomError {
    return new CustomError(
      new ErrorErrorData(
        error.error,
        error.localized_error,
        error.details.map(({ error }) => new ErrorDetail(error)),
      ),
      status,
    );
  }

  getStatus(): HttpStatus {
    return this.status;
  }

  getDetailsToString() {
    return this.error
      .getDetails()
      .map((res) => res.getErrorDetail())
      .toString();
  }

  setLocalizedError(message: string): this {
    this.error.setLocalizedError(message);
    return this;
  }
}

export class ErrorErrorData {
  private readonly error: string;
  private localized_error: string;
  private readonly details: ErrorDetail[];

  constructor(error: string, localized_error: string, details: ErrorDetail[] = []) {
    this.error = error;
    this.localized_error = localized_error;
    this.details = details;
  }

  getError(): string {
    return this.error;
  }

  gerLocalizedError(): string {
    return this.localized_error;
  }

  setLocalizedError(localizedError: string): this {
    this.localized_error = localizedError;
    return this;
  }

  addDetail(detail: ErrorDetail): ErrorErrorData {
    this.details.push(detail);
    return this;
  }

  getDetails(): ErrorDetail[] {
    return this.details;
  }
}

export class ErrorDetail {
  private readonly error: string;

  constructor(error: string) {
    this.error = error;
  }

  getErrorDetail() {
    return this.error;
  }
}
