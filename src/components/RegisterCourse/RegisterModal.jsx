import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import ListClassToRegister from './ListClassToRegister'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  outline: 'none',
  p: 4,
}

export default function RegisterModal(props) {
  let { open, handleOpen, handleClose, day } = props
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            LỰA CHỌN LỚP HỌC PHẦN
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ListClassToRegister day={day} />
          </Typography>
          <br></br>
          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
