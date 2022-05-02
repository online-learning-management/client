import { ClassType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof ClassType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Mã lớp',
    accessor: 'class_id',
  },
  {
    Header: 'Sĩ số',
    accessor: 'current_number_students',
  },
  {
    Header: 'Sĩ số tối đa',
    accessor: 'max_number_students',
  },
  {
    Header: 'Giảng viên',
    accessor: 'user_id',
  },
  {
    Header: 'Môn học',
    accessor: 'subject_id',
  },
  {
    Header: 'Trạng thái',
    accessor: 'status',
    Cell: (props) => (props.value ? 'Đang hoạt động' : 'Đã kết thúc'),
  },
]
