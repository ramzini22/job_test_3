export class MockBaseTest<T> {
  private readonly mockOne: T;

  private readonly mockMany: T[] = [];

  private readonly countNotDeleted: number;

  private readonly responseFields: string[] = [];

  constructor(mockOne: T, mockMany: T[], countNotDeleted: number, responseFields: Array<string>) {
    this.mockOne = mockOne;
    this.mockMany = mockMany;
    this.countNotDeleted = countNotDeleted;
    this.responseFields = responseFields;
  }

  public getMockOne(): T {
    return this.mockOne;
  }

  public getMockMany(): T[] {
    return this.mockMany;
  }

  public getCountNotDeleted(): number {
    return this.countNotDeleted;
  }

  public getResponseFields(): string[] {
    return this.responseFields;
  }
}
