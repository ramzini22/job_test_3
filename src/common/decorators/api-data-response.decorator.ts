import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";

export const ApiDataResponse = <TModel extends Type>(model: TModel, description?: string) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOperation({ description }),
    ApiOkResponse({
      schema: {
        properties: { data: { $ref: getSchemaPath(model) } },
      },
    }),
  );
};
