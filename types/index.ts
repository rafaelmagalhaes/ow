export interface LandRegistryInterface {
  titleNumber: string;
  propertyAddress: string;
  Tenure: string;
  X: number;
  Y: number;
}
export enum TableHeaderSorting {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}

export interface TableHeaderItem {
  id: string;
  label: string;
  isSortable: boolean;
  activeSort: boolean;
  sorting: TableHeaderSorting;
}
