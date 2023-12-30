import { applyDecorators } from "@nestjs/common";
import { IsInt, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { NumbersUtils } from "../utils/numbers.utils";

/**
 * validate is integer value
 */

export const IsInteger = (params: IsIntegerParams = {}) => {
  return applyDecorators(
    Transform(target => isNaN(target.value) ? target.value : +target.value),
    IsInt() as PropertyDecorator,
    Min(params.min ?? NumbersUtils.INTEGER_MIN) as PropertyDecorator,
    Max(params.max ?? NumbersUtils.INTEGER_MAX) as PropertyDecorator,
  );
};

export type IsIntegerParams = {
  max?: number;
  min?: number;
};
