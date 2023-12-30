export type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type AnyObject = Record<string, unknown>;

// as import { Type } from "@nestjs/common/interfaces/type.interface";
export type ClassType<T = AnyObject> = new (...args: unknown[]) => T;

/* class decorator */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export enum FieldType {
  NUMBER = "number",
  STRING = "string",
}

export type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
