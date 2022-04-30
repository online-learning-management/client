import { useQuery } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'

const getAll = (query = {}) =>
  useQuery([RQ.TEACHERS, query], teacherApi.getAll, {
    keepPreviousData: true,
  })

const useTeacherQuery = {
  getAll,
}

export default useTeacherQuery
