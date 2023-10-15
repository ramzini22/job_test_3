import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";

export const ApiMetaDataArrayResponse = <TModel extends Type, MModel extends Type>(
  dataType: TModel,
  metaType: MModel,
  description?,
) => {
  return applyDecorators(
    ApiExtraModels(dataType),
    ApiExtraModels(metaType),
    ApiOperation({ description }),
    ApiOkResponse({
      schema: {
        properties: {
          meta: { $ref: getSchemaPath(metaType) },
          data: { type: "array", items: { $ref: getSchemaPath(dataType) } },
        },
      },
    }),
  );
};
