
export class CustomBaseEntity<T = number> {
  private id: T;

  constructor(id: T) {
    this.id = id;
  }

  public getId(): T {
    return this.id;
  }

  public setId(value: T) {
    this.id = value;
  }

  public setAll(value: string | number | boolean): this {
    Object.keys(this).forEach((key) => (this[key] = value));
    return this;
  }

  public setAllNull(): this {
    return this.setAll(null);
  }
}
