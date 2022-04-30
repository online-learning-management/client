import axiosClient from './axiosClient'

const URL = 'majors'

const majorApi = {
  getAll: (params = {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body) => axiosClient.post(`/${URL}`, body),
  update: (body) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number) => axiosClient.delete(`/${URL}/${id}`),
}

export default majorApi
