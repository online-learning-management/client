import { useQuery } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'

const getById = (id: number | null) =>
  useQuery([RQ.TEACHERS, id], teacherApi.getById, {
    enabled: !!id,
  })

const getAll = (query = {}) =>
  useQuery([RQ.TEACHERS, query], teacherApi.getAll, {
    keepPreviousData: true,
  })

const useTeacherQuery = {
  getById,
  getAll,
}

export default useTeacherQuery
