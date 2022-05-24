import { useContext, useEffect, useRef, useState } from 'react'

import { Avatar, Box, Button, Stack, styled } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'

import Image from 'src/images/background.jpg'
import { AuthContext } from 'src/contexts/authContext/AuthContext'
import userApi from 'src/apis/userApi'
import { END_POINT_IMG } from 'src/const'

export default function ProfilePage() {
  const { user } = useContext(AuthContext)

  const inputRef = useRef(null)
  const [avatar, setAvatar] = useState('')
  const [uploadFile, setUploadFile] = useState(Image)
  const [email, setEmail] = useState(user.email)

  // ============ EFFECT =============
  useEffect(() => {
    setAvatar(`${END_POINT_IMG}/${user.avatar}`)
  }, [user.avatar])

  // ============ HANDLE FUNCTIONS =============
  const handleImage = (event) => {
    const file = event.target.files[0]
    setUploadFile(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setAvatar(reader.result)
    }
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', uploadFile)
      formData.append('email', 'emai1l@gmail.com')

      await userApi.update(user.user_id, formData)
    } catch (error) {}
  }

  return (
    <Stack spacing={2} direction="row">
      <Stack sx={{ width: 360 }} alignItems="center">
        <input type="file" ref={inputRef} hidden onChange={handleImage} />
        <BoxStyled sx={{ position: 'relative' }} onClick={() => inputRef.current?.click()}>
          <Avatar className="image-when-hover" sx={{ width: 280, height: 280 }} alt="Remy Sharp" src={avatar} />

          <Box
            className="camera-icon"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              color: 'white',
              display: 'none',
            }}
          >
            <CameraAlt sx={{ fontSize: '36px' }} />
          </Box>
        </BoxStyled>

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Thay đổi
        </Button>
      </Stack>

      <Stack sx={{ flex: 1 }}></Stack>
    </Stack>
  )
}

const BoxStyled = styled(Box)(() => ({
  cursor: 'pointer',
  borderRadius: '50%',

  '&:hover .image-when-hover': {
    filter: 'brightness(0.76)',
  },

  '&:hover  .camera-icon': {
    display: 'block',
  },
}))
