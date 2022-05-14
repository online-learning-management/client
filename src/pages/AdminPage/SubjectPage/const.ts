import { SubjectType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof SubjectType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Tên môn',
    accessor: 'subject_name',
  },
  {
    Header: 'Chuyên khoa',
    accessor: 'specialty_id',
  },
  {
    Header: 'Số tín chỉ',
    accessor: 'credit_id',
  },
]

export const FORM_CREATE_LABEL = 'Thêm môn học'
export const FORM_UPDATE_LABEL = 'Sửa thông tin môn học'
