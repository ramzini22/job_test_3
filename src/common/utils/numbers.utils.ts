export class NumbersUtils {
  public static readonly INTEGER_MAX = 2147483647;
  public static readonly INTEGER_MIN = -2147483648;
  public static readonly DOUBLE_PRECISION_MAX = 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
  public static readonly DOUBLE_PRECISION_MIN =
    -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;

  public static toNumberOrDefault(value, defaultValue: number): number {
    return +value || defaultValue;
  }
}