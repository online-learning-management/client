// MUI COMPONENTS
import { Box } from '@mui/material'
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'

// MUI ICONS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'

// REACT-ROUTER-DOM
import { NavLink } from 'react-router-dom'

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
})

interface DrawerProps extends MuiDrawerProps {
  drawerWidth: number
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerProps>(
  ({ theme, open, drawerWidth }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

type SideBarProps = {
  drawerWidth: number
  open: boolean
}

const SIDEBAR_TOP = [
  {
    text: 'Trang chủ',
    icon: <HomeOutlinedIcon />,
    path: '/',
  },
  {
    text: 'Lớp học',
    icon: <SchoolOutlinedIcon />,
    path: '/classes',
  },
  {
    text: 'Tài khoản',
    icon: <AdminPanelSettingsOutlinedIcon />,
    path: '/user-management',
  },
]

const SIDEBAR_BOTTOM = [
  {
    text: 'Logout',
    icon: <LogoutIcon />,
  },
]

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',

  '&.active > .MuiListItemButton-root': {
    color: 'white',
    backgroundColor: '#7070d8',
  },

  '&.active .MuiSvgIcon-root': {
    color: 'white',
  },

  '& > .MuiListItemButton-root': {
    margin: '8px 0',
  },
}))

export default function SideBar({ drawerWidth, open }: SideBarProps) {
  return (
    <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <List
        sx={{ px: 1, pt: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
      >
        {/* TOP SIDEBAR ITEMS */}
        <Box>
          {/* HEADER SIDEBAR */}
          <ListItemButton
            disableRipple={true}
            sx={{
              minHeight: 44,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: 2,
              mb: 2,
              '&:hover': {
                cursor: 'default',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon
              sx={{
                ...(open && { ml: -2 }),
                justifyContent: 'center',
                color: '#4a49cb',
              }}
            >
              <LogoDevOutlinedIcon
                sx={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </ListItemIcon>

            <ListItemText primary={'BeeLearning'} secondary="Studying together" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          {SIDEBAR_TOP.map(({ text, icon, path }) => (
            <StyledNavLink key={text} to={path}>
              <ListItemButton
                // onClick={() => navigate(path)}
                sx={{
                  minHeight: 44,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>

                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </StyledNavLink>
          ))}
        </Box>

        {/* BOTTOM SIDEBAR ITEMS */}
        <Box>
          {SIDEBAR_BOTTOM.map(({ text, icon }, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 44,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>

              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </Box>
      </List>
    </Drawer>
  )
}
