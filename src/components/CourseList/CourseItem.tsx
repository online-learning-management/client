import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)
type Props = {}

export default function CourseItem({}: Props) {
  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 200 }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Lớp đang diễn ra
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">Lập trình web bằng PHP</Typography>
          </CardContent>
        </Card>
        <CardActions>
          <Button size="small">Vào học</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
