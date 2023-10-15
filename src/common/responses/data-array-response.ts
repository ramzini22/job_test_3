import { ApiProperty } from "@nestjs/swagger";
import { DataResponse } from "./data-response.dto";

export class DataArrayResponse<DATA> extends DataResponse<DATA[]> {
  @ApiProperty()
  data: DATA[];

  constructor(data?: DATA[]) {
    super(data);
  }

  isNotEmpty(): boolean {
    return !!this.data?.length;
  }

  dataOrNull(): this | null {
    return this.isNotEmpty() ? this : null;
  }
}
