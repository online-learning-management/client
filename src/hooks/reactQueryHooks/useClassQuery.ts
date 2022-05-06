import { useQuery } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'

const getById = (id = '') =>
  useQuery([RQ.CLASS, id], classApi.getById, {
    enabled: !!id,
  })

const getAll = (query = {}) =>
  useQuery([RQ.CLASSES, query], classApi.getAll, {
    keepPreviousData: true,
  })

const useClassQuery = {
  getById,
  getAll,
}

export default useClassQuery
