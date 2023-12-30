import { AnyObject, ClassType, FieldType } from "./type.utils";
import { ValidationObjectPattern } from "./excel/excel-utils.type";

export class ObjectUtils {
  // parameters are defined and not null and not NaN
  public static onlyDefinedValues(obj: AnyObject) {
    return obj && Object.keys(obj).every((key) => obj[key] !== undefined && obj[key] !== null);
  }

  public static objectHasAllSourceProperties(
    target: AnyObject,
    pattern: ValidationObjectPattern,
  ): string[] {
    if (!pattern) {
      return [];
    }
    const patternKeys = Object.keys(pattern);
    if (!target) {
      return ObjectUtils.patternTranslate(patternKeys, pattern);
    }
    const noKeys = patternKeys.filter(
      (key) =>
        !pattern[key].isOptional && !ObjectUtils.objectHasOwnProperty(target, pattern[key].name),
    );
    return ObjectUtils.patternTranslate(noKeys, pattern);
  }

  public static patternTranslate(arrayKeys: string[], pattern: ValidationObjectPattern) {
    return arrayKeys.map((key) => {
      return pattern[key].name;
    });
  }

  public static objectHasOwnProperty(object: AnyObject, funcName: string): boolean {
    return Object.prototype.hasOwnProperty.call(object, funcName);
  }

  public static arrayObjectPropsTypesValidation(
    targets: AnyObject[],
    pattern: ValidationObjectPattern,
  ): { index; key }[] {
    const sourceKeys = Object.keys(pattern);
    const invalidFields: { index; key }[] = [];
    targets.forEach((target, index) =>
      sourceKeys.forEach((key) => {
        const { type, name, isOptional, defaultValue, isChangeable } = pattern[key];
        const targetElement = target[name];
        if (type === FieldType.NUMBER && !isNaN(+targetElement)) {
          target[name] = +targetElement;
        } else if ((!ObjectUtils.objectHasOwnProperty(target, key) && isOptional) || isChangeable) {
          target[name] = defaultValue;
        } else if (typeof targetElement != type) {
          invalidFields.push({ index, key: name });
        }
      }),
    );
    return invalidFields;
  }

  public static mapArrayObjectKeys<T>(
    objectsToMap: AnyObject[],
    pattern: ValidationObjectPattern,
  ): T[] {
    return objectsToMap.map((objectToMap) => ObjectUtils.mapObjectKeys<T>(objectToMap, pattern));
  }

  public static mapObjectKeys<T>(objectToMap: AnyObject, pattern: ValidationObjectPattern): T {
    const newObject = {};
    Object.keys(pattern).forEach((key) => {
      newObject[key] = objectToMap[pattern[key].name];
    });
    return newObject as T;
  }

  public static arrayObjectKeysToLowerCase<T>(objects: AnyObject[]): T[] {
    const newObjects = [];
    objects.forEach((object) => newObjects.push(ObjectUtils.objectKeysToLowerCase(object)));
    return newObjects;
  }

  public static objectKeysToLowerCase<T extends AnyObject>(object: AnyObject): T {
    return Object.keys(object).reduce((consumer, key) => {
      consumer[
        key
          .toLowerCase()
          .replace(/\s{2,}/g, " ") // double space
          .replace(/^\s*|\s*$/g, "") // start end space
      ] = object[key];
      return consumer;
    }, {}) as T;
  }

  public static cast<T>(rawObj: AnyObject, constructor: ClassType<T>): T {
    const obj = new constructor();
    for (const i in rawObj) {
      obj[i] = rawObj[i];
    }
    return obj;
  }

  public static firstOrSecondIfUndefined<T>(first: T, second: T): T {
    return first === undefined ? second : first;
  }

  static removeUndefinedValues(object: AnyObject) {
    return Object.keys(object).reduce((prev, key) => {
      if (object[key] !== undefined) {
        prev[key] = object[key];
      }
      return prev;
    }, {});
  }
}
