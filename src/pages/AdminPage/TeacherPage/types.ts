import { UserType } from 'src/types'

export type ModalFormType = {
  open: boolean
  data?: UserType
  type: 'CREATE' | 'UPDATE'
}
