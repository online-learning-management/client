import axiosClient from './axiosClient'

const URL = 'subjects'

const subjectApi = {
  getOne: ({ queryKey }) => axiosClient.get(`${URL}/${queryKey[1]}`),
  getAll: ({ queryKey }) => axiosClient.get(`/${URL}`, { params: { ...queryKey[1] } }),
  create: (body) => axiosClient.post(`/${URL}`, body),
  update: (body) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number) => axiosClient.delete(`/${URL}/${id}`),
}

export default subjectApi
