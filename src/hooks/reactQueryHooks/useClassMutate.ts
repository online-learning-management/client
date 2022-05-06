import { useMutation, useQueryClient } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'
import { ResponseType } from 'src/types'

const create = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.create, {
    onSuccess: (responseData) => {
      queryClient.invalidateQueries(RQ.CLASSES)

      // const data = responseData?.data

      // // check response data: if have data => add data to cache || if no => refetch query
      // if (data) {
      //   queryClient.setQueryData<ResponseType>(RQ.CLASSES, (cacheData) => ({
      //     ...cacheData,
      //     data: [cacheData?.data],
      //   }))
      // } else queryClient.invalidateQueries(RQ.CLASSES)

      onSuccess()
    },
    onError: () => {
      onError()
    },
  })
}

const update = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.update, {
    onSuccess: (_responseData, updateData) => {
      queryClient.invalidateQueries(RQ.CLASSES)

      // // update cache when request success
      // queryClient.setQueryData<ResponseType>(RQ.CLASSES, (cacheData) => ({
      //   ...cacheData,
      //   data: cacheData?.data?.map((user) => (user.user_id === updateData.user_id ? updateData : user)),
      // }))

      onSuccess()
      onError()
    },
  })
}

const deleteClass = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.delete, {
    onSuccess: (_responseData, id) => {
      queryClient.invalidateQueries(RQ.CLASSES)

      // // delete data with id in cache
      // queryClient.setQueryData<ResponseType>(RQ.CLASSES, (cacheData) => ({
      //   ...cacheData,
      //   data: cacheData?.data?.filter((user) => user.user_id !== id),
      // }))

      onSuccess()
      onError()
    },
  })
}

const useClassMutate = {
  create,
  update,
  delete: deleteClass,
}

export default useClassMutate
