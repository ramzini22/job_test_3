import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { QueryPaginationDto } from "./query-pagination.dto";
import { IsOptional } from "./is-optional.decorator";

export class QuerySearchUnlimitedPaginationDto extends QueryPaginationDto {
  @IsOptional(true)
  @IsString()
  @ApiProperty({
    description: "Search string for title and body fields",
    required: false,
  })
  private readonly q?: string;

  getQ(): string {
    return this.q;
  }
}
