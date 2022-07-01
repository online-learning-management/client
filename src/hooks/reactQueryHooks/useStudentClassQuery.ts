import { useQuery } from 'react-query'
import studentClassApi from 'src/apis/studentClassApi'
import { RQ } from 'src/const'
import { ResponseType, StudentClassType } from 'src/types'

export type QueriesType = ResponseType & {
  data: StudentClassType[]
}

export type QueryType = ResponseType & {
  data: StudentClassType
}

// const getById = (id = 0) =>
//   useQuery([RQ.STUDENT, id], () => studentClassApi.getById(id), {
//     enabled: !!id,
//     select: (data): QueryType => data.data,
//   })

const getAll = (params = {}) =>
  useQuery([RQ.STUDENT_CLASSES, params], () => studentClassApi.getAll(params), {
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useStudentClassQuery = {
  // getById,
  getAll,
}

export default useStudentClassQuery
