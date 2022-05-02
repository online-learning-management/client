import { useQuery } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'

const getOne = (id = '') =>
  useQuery([RQ.CLASS, id], classApi.getOne, {
    enabled: !!id,
  })

const getAll = (query = {}) =>
  useQuery([RQ.CLASSES, query], classApi.getAll, {
    keepPreviousData: true,
  })

const useClassQuery = {
  getOne,
  getAll,
}

export default useClassQuery
