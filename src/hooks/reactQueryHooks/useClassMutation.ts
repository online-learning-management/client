import { useMutation, useQueryClient } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(classApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(classApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(classApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
    },
  })
}

const useClassMutation = {
  create,
  update,
  delete: deleteById,
}

export default useClassMutation
