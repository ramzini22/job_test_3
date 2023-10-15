import { ApiProperty } from "@nestjs/swagger";

export class DataResponse<D> {
  @ApiProperty()
  data: D;

  constructor(data?: D) {
    this.data = data;
  }

  setData(data: D): this {
    this.data = data;
    return this;
  }

  isNotEmpty(): boolean {
    return !!(this.data && Object.keys(this.data).length);
  }

  dataOrNull(): this | null {
    return this.isNotEmpty() ? this : null;
  }

  public getData(): D {
    return this.data;
  }

  static getResponseForEmptyArray = () => [];
}
