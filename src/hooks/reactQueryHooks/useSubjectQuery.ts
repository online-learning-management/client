import { useQuery } from 'react-query'
import subjectApi from 'src/apis/subjectApi'
import { RQ } from 'src/const'

const getById = (id = '') =>
  useQuery([RQ.CLASS, id], subjectApi.getById, {
    enabled: !!id,
  })

const getAll = (query = {}) =>
  useQuery([RQ.CLASSES, query], subjectApi.getAll, {
    keepPreviousData: true,
  })

const useSubjectQuery = {
  getById,
  getAll,
}

export default useSubjectQuery
