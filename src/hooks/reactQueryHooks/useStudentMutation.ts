import { useMutation, useQueryClient } from 'react-query'
import studentApi from 'src/apis/studentApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
    },
  })
}

const useStudentMutation = {
  create,
  update,
  delete: deleteById,
}

export default useStudentMutation
