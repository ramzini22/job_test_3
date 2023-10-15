import { IsInteger } from './../../decorators/is-integer.decorator';
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryOffsetDto {
  @ApiProperty({
    required: false,
    default: 0,
    minimum: 0,
    description: "Number of skipped entries per page",
  })
  @IsOptional()
  @IsInteger({ min: 0 })
  private readonly offset?: number;

  constructor(offset: number) {
    this.offset = offset;
  }

  getOffset(): number {
    return this.offset;
  }
}
