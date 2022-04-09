import CourseItem from './CourseItem'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'

type Props = {}

export default function CourseList({}: Props) {
  return (
    <Grid container spacing={2}>
      <CourseItem />
      <CourseItem />
    </Grid>
  )
}
