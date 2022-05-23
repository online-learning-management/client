import React from 'react'

import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import SchoolIcon from '@mui/icons-material/School'

export default function DetailLesson(props) {
  let { data } = props
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        background: 'linear-gradient(to left, #a8c0ff, #3f2b96)',
        borderRadius: '10px',
        color: 'white',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ color: 'white' }}>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary={data?.content} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => window.open(`${data?.link_document}`, '_blank')}>
            <ListItemIcon>
              <StarBorder sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Tài liệu học tập" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => window.open(`${data?.link_class_online}`, '_blank')}>
            <ListItemIcon>
              <StarBorder sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Lớp học online" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
