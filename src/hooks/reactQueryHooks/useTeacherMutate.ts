import { useMutation, useQueryClient } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'
import { ResponseType } from 'src/types'

const create = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.create, {
    onSuccess: (responseData) => {
      queryClient.invalidateQueries(RQ.TEACHERS)

      // const data = responseData?.data

      // // check response data: if have data => add data to cache || if no => refetch query
      // if (data) {
      //   queryClient.setQueryData<ResponseType>(RQ.TEACHERS, (cacheData) => ({
      //     ...cacheData,
      //     data: [cacheData?.data],
      //   }))
      // } else queryClient.invalidateQueries(RQ.TEACHERS)

      onSuccess()
    },
    onError: () => {
      onError()
    },
  })
}

const update = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.update, {
    onSuccess: (_responseData, updateData) => {
      queryClient.invalidateQueries(RQ.TEACHERS)

      // // update cache when request success
      // queryClient.setQueryData<ResponseType>(RQ.TEACHERS, (cacheData) => ({
      //   ...cacheData,
      //   data: cacheData?.data?.map((user) => (user.user_id === updateData.user_id ? updateData : user)),
      // }))

      onSuccess()
      onError()
    },
  })
}

const deleteTeacher = (onSuccess = () => {}, onError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.delete, {
    onSuccess: (_responseData, id) => {
      queryClient.invalidateQueries(RQ.TEACHERS)

      // // delete data with id in cache
      // queryClient.setQueryData<ResponseType>(RQ.TEACHERS, (cacheData) => ({
      //   ...cacheData,
      //   data: cacheData?.data?.filter((user) => user.user_id !== id),
      // }))

      onSuccess()
      onError()
    },
  })
}

const useTeacherMutate = {
  create,
  update,
  delete: deleteTeacher,
}

export default useTeacherMutate
