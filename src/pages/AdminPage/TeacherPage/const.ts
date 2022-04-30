export type UserType = {
  user_id: number
  full_name: string
  email?: string
  date_of_birth: string
  gender: string
  address: string
  avatar?: string
  username: string
  password: string

  // Teacher
  specialty?: string

  // Student
  GPA?: number

  role_id: string
}

export const COLUMNS = [
  {
    Header: 'full_name',
    accessor: 'full_name',
  },
  {
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'gender',
    accessor: 'gender',
  },
  {
    Header: 'address',
    accessor: 'address',
  },
  // {
  //   Header: 'avatar',
  //   accessor: 'avatar',
  // },
  {
    Header: 'date_of_birth',
    accessor: 'date_of_birth',
  },
]
