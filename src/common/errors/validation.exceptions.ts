import {
  createCustomErrorBadRequestRaw,
  createCustomInvalidInputRaw,
  throwInvalidInputException,
} from "../utils/error.utils";

export class ValidationExceptions {
  public static throwInvalidIdException() {
    throwInvalidInputException("Передано невалидное число уникального идентификатора.");
  }
  public static throwInvalidEnumException() {
    return createCustomInvalidInputRaw("Передано невалидное невалидное значение enum.");
  }

  public static throwInvalidUUIDException() {
    return createCustomErrorBadRequestRaw("Передан неверный UUID.");
  }

  public static uploadFileException() {
    return createCustomErrorBadRequestRaw("Ошибка загрузки файла.");
  }
}
