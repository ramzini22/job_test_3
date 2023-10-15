import { PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";
import { NumbersUtils } from "../utils/numbers.utils";
import { ValidationExceptions } from "../errors/validation.exceptions";

export class ParseIdPipe implements PipeTransform {
  transform(value: string) {
    const number = +value;
    if (isNaN(number) || number <= 0 || number >= NumbersUtils.INTEGER_MAX || number % 1 !== 0) {
      ValidationExceptions.throwInvalidIdException();
    }
    return number;
  }
}
