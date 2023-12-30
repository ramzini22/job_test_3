import { IsInteger } from "./../../decorators/is-integer.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { QueryOffsetDto } from "./query-offset.dto";
import { IsOptional } from "class-validator";

export class QueryPaginationDto extends QueryOffsetDto {
  @ApiProperty({
    required: false,
    description: "Number of entries per page",
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsInteger({ min: 1, max: 100 })
  private limit?: number;

  constructor(limit: number, offset: number) {
    super(offset);
    this.limit = limit;
  }

  getLimit(): number {
    return this.limit;
  }

  setLimit(value: number) {
    this.limit = value;
  }
}
