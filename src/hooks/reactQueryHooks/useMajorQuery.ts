import { useQuery } from 'react-query'
import majorApi from 'src/apis/majorApi'
import { RQ } from 'src/const'

export const getAll = () => useQuery(RQ.MAJORS, majorApi.getAll)

const useMajorQuery = {
  getAll,
}

export default useMajorQuery
