import React from 'react'

import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'

export default function DetailLesson(props) {
  let { item } = props
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        background: 'linear-gradient(to right, #a8c0ff, #3f2b96)',
        borderRadius: '10px',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={`Buổi ${item?.id} ${item?.content}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* item */}
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Lí thuyết" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Thực hành" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
