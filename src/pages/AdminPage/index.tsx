import { Box, Button, Stack } from '@mui/material'
import { useState } from 'react'
import FormCreate from './components/FormCreate'
import TableShow from './components/TableShow'

export default function CreateUser() {
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="">
      <Stack sx={{ mb: 2 }}>
        <Box>
          <Button onClick={() => setShowForm(!showForm)} variant="outlined">
            Create teacher
          </Button>
        </Box>
      </Stack>

      <FormCreate open={showForm} onClose={() => setShowForm(false)} />

      <TableShow />
    </div>
  )
}
