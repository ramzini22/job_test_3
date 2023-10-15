import { HttpStatus } from "@nestjs/common";

export type ErrorResponseType = {
  error: ErrorErrorDataType;
};

export type ErrorErrorDataType = {
  error: string;
  localized_error: string;
  details: ErrorDetailType[];
  status: HttpStatus;
};

export type ErrorDetailType = {
  error: string;
};
