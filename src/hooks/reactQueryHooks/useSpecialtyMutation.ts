import { useMutation, useQueryClient } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const useSpecialtyMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSpecialtyMutation
