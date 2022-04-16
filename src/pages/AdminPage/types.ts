export interface Data {
  full_name: string
  username: string
  email: string
  avatar: string
}

export interface HeadCell {
  disablePadding: boolean
  id?: keyof Data
  label: string
  numeric: boolean
}
