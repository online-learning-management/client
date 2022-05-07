import { useMutation, useQueryClient } from 'react-query'
import subjectApi from 'src/apis/subjectApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
    },
  })
}

const useSubjectMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSubjectMutation
