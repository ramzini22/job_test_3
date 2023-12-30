import { AnyObject, FieldType } from "../type.utils";

export type GetDateFromEXCELType = {
  cellDates?: boolean;
  dateNF?;
  worksheet?: WorkSheetNameType | string;
  range: number;
  defval?: number;
};

export enum WorkSheetNameType {
  ADD_TASKS = "Доп",
  UPLOAD_RESULTS = "ФК",
  KPI_FC = "KPI ФК",
  UNLOADING = "Выгрузка",
}

export type ReportOptions<T> = Partial<{
  firstLineColour: string;
  dateFormat: DateFormat;
  columnWidth: ColumnWidth<T>;
  defaultColumnWidth: number;
}>;

export type ColumnWidth<T> = Partial<Record<keyof T, number>>;

export enum DateFormat {
  WithTime = "dd/mm/yyyy hh:mm:ss",
  WithoutTime = "dd/mm/yyyy",
}

export type ValidationObjectPattern<T = ValidationObjectValueType> = {
  [key: string]: T;
};

export type ValidationObjectValueType = {
  name: string;
  type: FieldType;
  isOptional?: boolean;
  isChangeable?: boolean; // to set default value if type is different
  defaultValue?: string | number;
  replace?: ReplaceType[];
};

export type ReplaceType = { from: string; to: string };

export const removePercent = (): ReplaceType => {
  return { from: "%", to: "" };
};

export type ParseExcelWorkerDataType = {
  buffer: Buffer;
  pattern: ValidationObjectPattern;
  getDataInfo: GetDateFromEXCELType;
};

export type WriteExcelWorkerDataType<T = AnyObject> = {
  data: T[];
  options: ReportOptions<T>;
  sheetName: string;
  sharedArrayBuffer: SharedArrayBuffer;
};
