import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, width } from '@mui/system'
import Stack from '@mui/material/Stack'

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { Link } from 'react-router-dom'

export default function ClassItem(props) {
  let { data } = props
  return (
    <Link to={`detail-class-${data.id}`}>
      <Card sx={{ maxWidth: 480 }}>
        <CardActionArea>
          <CardMedia component="img" height="200" image={data?.image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data?.className}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
