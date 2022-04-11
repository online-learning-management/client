import CourseItem from './CourseItem'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'
import { spacing } from '@mui/system'

type Props = {}

export default function CourseList({}: Props) {
  return (
    <Grid container spacing={2} sx={{ width: '100%', display: 'flex', m: '0px', p: '80px' }}>
      <CourseItem />
      <CourseItem />
    </Grid>
  )
}
