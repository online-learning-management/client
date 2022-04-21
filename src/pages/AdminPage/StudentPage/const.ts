import { HeadCell, Data } from './types'

import { faker } from '@faker-js/faker'

export const headCells: readonly HeadCell[] = [
  {
    id: 'full_name',
    numeric: false,
    disablePadding: false,
    label: 'Họ tên và email',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Tên đăng nhập',
  },
  {
    id: 'GPA',
    numeric: false,
    disablePadding: false,
    label: 'GPA',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Địa chỉ',
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Hành đồng',
  },
]

export function createData(
  full_name: string,
  email: string,
  username: string,
  avatar: string,
  GPA: number,
  address: string
): Data {
  return {
    full_name,
    email,
    username,
    avatar,
    GPA,
    address,
  }
}

export const rows: Data[] = []

for (let i = 0; i < 20; i++) {
  rows.push(
    createData(
      faker.name.findName(),
      faker.internet.email(),
      faker.internet.userName(),
      faker.image.avatar(),
      Math.floor(Math.random() * 5),
      faker.internet.userName()
    )
  )
}
