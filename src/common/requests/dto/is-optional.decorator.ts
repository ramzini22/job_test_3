/**
 * @author: valeevtr
 * @created: 17.07.2023
 * @Time: 14:52
 * @IDE: WebStorm
 */

import { ValidationOptions, ValidateIf, IsOptional as IsOptionalValidator } from "class-validator";

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param nullable If `true`, all other validators will be skipped even when the value is `null`. `false` by default.
 * @param validationOptions {@link ValidationOptions}
 *
 * @see IsOptional exported from `class-validator.
 */
export function IsOptional(nullable = false, validationOptions?: ValidationOptions) {
  if (nullable) {
    return IsOptionalValidator(validationOptions);
  }

  return ValidateIf((ob: unknown, v: unknown) => {
    return v !== undefined;
  }, validationOptions);
}
