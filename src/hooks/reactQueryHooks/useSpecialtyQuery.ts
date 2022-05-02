import { useQuery } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'

export const getAll = () => useQuery(RQ.SPECIALTIES, specialtyApi.getAll)

const useSpecialtyQuery = {
  getAll,
}

export default useSpecialtyQuery
