import axiosClient from './axiosClient'

const URL = 'users'

const teacherApi = {
  getById: ({ queryKey }) => axiosClient.get(`/${URL}/${queryKey[1]}`),
  getAll: ({ queryKey }) => axiosClient.get(`/${URL}`, { params: { ...queryKey[1], role_id: 'r2' } }),
  create: (body) => axiosClient.post(`/${URL}`, { ...body, role_id: 'r2' }),
  update: (body) => axiosClient.put(`/${URL}/${body.user_id}`, body),
  delete: (id: number) => axiosClient.delete(`/${URL}/${id}`),
}

export default teacherApi
