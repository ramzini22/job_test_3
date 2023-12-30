import { ApiProperty } from "@nestjs/swagger";

export class MetaDto {
  @ApiProperty({ description: "Number of entries per page" })
  private readonly count: number;

  @ApiProperty({ description: "Number of skipped entries per page" })
  private readonly limit: number;

  @ApiProperty({ description: "" })
  private readonly offset: number;
}
