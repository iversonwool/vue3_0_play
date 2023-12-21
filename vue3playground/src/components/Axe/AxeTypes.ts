import type { DataTableColumns } from 'naive-ui'
import { IFilterItem } from '@/interface/filters'
export interface ITableProps {
  request: <T>(formValues: T) => Promise<any>
  columns: DataTableColumns
}

export interface IFilterProps {
  config: IFilterItem[]
}

export type IAxeProps = {
  filterProps: IFilterProps
  tableProps: ITableProps
}

// function ff(s: ITableProps) {
// }
