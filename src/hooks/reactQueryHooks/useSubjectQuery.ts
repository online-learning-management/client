import { useQuery } from 'react-query'
import subjectApi from 'src/apis/subjectApi'
import { RQ } from 'src/const'

const getOne = (id = '') =>
  useQuery([RQ.CLASS, id], subjectApi.getOne, {
    enabled: !!id,
  })

const getAll = (query = {}) =>
  useQuery([RQ.CLASSES, query], subjectApi.getAll, {
    keepPreviousData: true,
  })

const useSubjectQuery = {
  getOne,
  getAll,
}

export default useSubjectQuery
