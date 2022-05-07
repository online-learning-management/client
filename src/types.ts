export type RoleType = {
  role_id: string
  role_name: string
}

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

export type SpecialtyType = {
  id: number
  specialty_name: string
}

export type CreditType = {
  id: number
  number_of_credits: string
  number_of_lessons: string
}

export type SubjectType = {
  id?: number
  subject_name: string

  specialty_id: number
  credit_id: number
}

export type ClassType = {
  class_id: string
  start_date: string
  max_number_students: number
  current_number_students: number
  status: boolean

  user_id: number
  subject_id: number
}

export type MetaType = {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export type ResponseType = {
  message?: string
  meta?: MetaType
}
