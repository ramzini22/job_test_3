import { CustomError } from "../errors/custom-error";

export class ErrorDataDto<DATA, ERR = CustomError> implements ErrorDataDto<DATA, ERR> {
  private error: ERR;
  private data: DATA;

  constructor({ error, data }: { error?: ERR; data?: DATA } = {}) {
    this.data = data;
    this.error = error;
  }

  public setError(value: ERR): this {
    this.error = value;
    return this;
  }

  public setData(value: DATA): this {
    this.data = value;
    return this;
  }

  public errorOrData(): ERR | DATA {
    return this.error ? this.error : this.data;
  }

  public dataOrError(): ERR | DATA {
    return this.data ? this.data : this.error;
  }

  public haveError(): boolean {
    return !!this.error;
  }

  public isCompleted(): boolean {
    return !this.error && !!this.data;
  }

  public getError(): ERR {
    return this.error;
  }

  public getData(): DATA {
    return this.data;
  }
}
