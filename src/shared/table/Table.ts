export interface ColumnsTable{
  tableColumn: string;
  columnName: string;
  size?: number;
  complement?: string;
  mask?: string;
  button?: {
    description?: string;
    icon?: string;
    loading: boolean;
    color: string;
    disabled?: boolean;
  }
}
