import { Box, Modal } from '@mui/material'

export type ModalCustomProps = {
  children: React.ReactNode
  open: boolean
  onClose?: () => void
}

export default function ModalCustom({ children, open, onClose }: ModalCustomProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '1888px',
          maxHeight: '86%',
          p: 2,
          mx: 2,
          borderRadius: 2,

          bgcolor: 'white',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Modal>
  )
}
