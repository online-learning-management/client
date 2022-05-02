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

export const rows: Data[] = []

for (let i = 0; i < 20; i++) {
  rows.push({
    full_name: faker.name.findName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    GPA: Math.floor(Math.random() * 5),
    address: faker.internet.userName(),
  })
}
