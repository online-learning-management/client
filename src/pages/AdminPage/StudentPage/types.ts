export interface Data {
  full_name: string
  username: string
  email: string
  avatar: string
  GPA: number
  address: string
}

export interface HeadCell {
  disablePadding: boolean
  id?: keyof Data
  label: string
  numeric: boolean
}

export type ModalCreateType = {
  open: boolean
  data?: Data
  type: 'CREATE' | 'UPDATE'
}
