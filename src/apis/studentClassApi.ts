import { StudentClassType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'student-class'

const studentClassApi = {
  // getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  // getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: StudentClassType) => axiosClient.post(`/${URL}`, body),
  // update: (body: StudentClassType) => axiosClient.put(`/${URL}/${body.id}`, body),
  // delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default studentClassApi
