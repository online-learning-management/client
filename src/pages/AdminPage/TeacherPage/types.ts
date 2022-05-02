import { UserType } from 'src/types'

export type ModalCreateType = {
  open: boolean
  data?: UserType
  type: 'CREATE' | 'UPDATE'
}
