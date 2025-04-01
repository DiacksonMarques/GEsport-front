export interface ColumnsTable{
  tableColumn: string;
  columnName: string;
  size?: number;
  complement?: (value: any)=>{};
  mask?: string;
  icon?: (value: any)=>{};
  button?: {
    description?: string;
    icon?: string;
    iconNext?: string;
    loading: boolean;
    color: string;
    disabled?: boolean;
  }
}
