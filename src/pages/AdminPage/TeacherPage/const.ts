import { UserType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof UserType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Tên đăng nhập',
    accessor: 'username',
  },
  {
    Header: 'Ngày sinh',
    accessor: 'date_of_birth',
  },
  {
    Header: 'Giới tính',
    accessor: 'gender',
  },
  {
    Header: 'Địa chỉ',
    accessor: 'address',
  },
]

export const FORM_CREATE_LABEL = 'Thêm giảng viên'
export const FORM_UPDATE_LABEL = 'Sửa thông tin giảng viên'
