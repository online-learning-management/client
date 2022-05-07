import { useMutation, useQueryClient } from 'react-query'
import creditApi from 'src/apis/creditApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
    },
  })
}

const useSpecialtyMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSpecialtyMutation
