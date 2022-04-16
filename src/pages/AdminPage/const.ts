import { HeadCell, Data } from './types'

import { faker } from '@faker-js/faker'

export const headCells: readonly HeadCell[] = [
  {
    id: 'full_name',
    numeric: false,
    disablePadding: false,
    label: 'Full Name/Email',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Username',
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
]

export function createData(full_name: string, email: string, username: string, avatar: string): Data {
  return {
    full_name,
    email,
    username,
    avatar,
  }
}

export const rows: Data[] = []

for (let i = 0; i < 10; i++) {
  rows.push(createData(faker.name.findName(), faker.internet.email(), faker.internet.userName(), faker.image.avatar()))
}
