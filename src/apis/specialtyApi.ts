import axiosClient from './axiosClient'

const URL = 'specialties'

const specialtyApi = {
  getAll: ({ queryKey }) => axiosClient.get(`/${URL}`, { params: { ...queryKey[1] } }),
  create: (body) => axiosClient.post(`/${URL}`, body),
  update: (body) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number) => axiosClient.delete(`/${URL}/${id}`),
}

export default specialtyApi