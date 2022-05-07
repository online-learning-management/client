import { useMutation, useQueryClient } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
    },
  })
}

const useTeacherMutation = {
  create,
  update,
  delete: deleteById,
}

export default useTeacherMutation
