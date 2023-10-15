import { CustomError, ErrorDetail, ErrorErrorData } from "../errors/custom-error";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export const createCustomErrorRaw = (
  status: HttpStatus,
  error: string,
  localized_error: string,
  details: string[] = [],
): CustomError => {
  return new CustomError(
    new ErrorErrorData(
      error,
      localized_error,
      details.map((detail) => new ErrorDetail(detail)),
    ),
    status,
  );
};

export const createCustomInvalidInputRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.BAD_REQUEST, "Invalid input.", "Неверный ввод.", details);
};
export const createCustomServerErrorRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Server Error.",
    "Ошибка сервера.",
    details,
  );
};
export const createCustomPayloadTooLarge = (...details: string[]): CustomError => {
  return createCustomErrorRaw(
    HttpStatus.PAYLOAD_TOO_LARGE,
    "Payload too large.",
    "Превышен объём загружаемых данных.",
    details,
  );
};
export const createCustomNotFoundRequestRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.NOT_FOUND, "Not Found.", "Не найдено.", details);
};
export const createCustomConflictRequestRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.NOT_FOUND, "Conflict.", "Конфликт.", details);
};

export const createCustomForbiddenRequestRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.FORBIDDEN, "Forbidden.", "Запрещено.", details);
};

export const createCustomUnauthorizedRequestRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.UNAUTHORIZED, "Unauthorized.", "Не авторизован.", details);
};

export const createCustomErrorBadRequestRaw = (...details: string[]): CustomError => {
  return createCustomErrorBadRequestRawFromArray(details);
};

export const createCustomErrorBadRequestRawFromArray = (details: string[] = []): CustomError => {
  return createCustomErrorRaw(HttpStatus.BAD_REQUEST, "Bad request", "Плохой запрос", details);
};

export const throwBadRequestException = (details: string) => {
  throw new BadRequestException(createCustomErrorBadRequestRaw(details));
};

export const badRequestException = (details: string) => {
  return new BadRequestException(createCustomErrorBadRequestRaw(details));
};

export const throwInvalidInputException = (details: string) => {
  const customError = createCustomInvalidInputRaw(details);
  throw new HttpException(customError.withoutStatus(), customError.getStatus());
};

export const createCustomUnauthorizedErrorRaw = (...details: string[]): CustomError => {
  return createCustomErrorRaw(HttpStatus.UNAUTHORIZED, "Unauthorized.", "Не авторизован.", details);
};

export const throwExceptionByCustomError = (customError: CustomError) => {
  throw new HttpException(customError.withoutStatus(), customError.getStatus());
};
