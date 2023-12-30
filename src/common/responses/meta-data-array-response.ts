import { DataArrayResponse } from "./data-array-response";

export class MetaDataArrayResponse<DATA> extends DataArrayResponse<DATA> {
  private meta: metaType;

  constructor(meta: metaType, data: DATA[]) {
    super(data);
    this.meta = meta;
  }

  getMeta(): metaType {
    return this.meta;
  }

  setMeta(value: metaType) {
    this.meta = value;
  }
}

export type metaType = Partial<{
  count: number;
  limit: number;
  offset: number;
}>;
