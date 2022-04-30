import { useState } from 'react'

// MUI COMPONENTS
import { Box, Collapse } from '@mui/material'
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
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'

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
  // {
  //   text: 'Tài khoản',
  //   icon: <AdminPanelSettingsOutlinedIcon />,
  //   path: '/user-management',
  // },
]

const SIDEBAR_TOP_ITEMS = [
  {
    text: 'Giáo viên',
    // icon: <HomeOutlinedIcon />,
    path: 'user-management/teacher',
  },
  {
    text: 'Sinh viên',
    // icon: <SchoolOutlinedIcon />,
    path: 'user-management/student',
  },
  // {
  //   text: 'Tài khoản',
  //   icon: <AdminPanelSettingsOutlinedIcon />,
  //   path: '/user-management',
  // },
]

const SIDEBAR_BOTTOM = [
  {
    text: 'Logout',
    icon: <LogoutIcon />,
  },
]

const StyledNavLink = styled(NavLink)(() => ({
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

const StyledCollapseNavLink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',

  '&.active .MuiTypography-root': {
    fontWeight: 700,
  },

  '& > .MuiListItemButton-root': {
    padding: '6px 0',
    paddingLeft: '56px',
  },

  '& > .MuiListItemButton-root:hover': {
    backgroundColor: 'transparent',
  },
}))

export default function SideBar({ drawerWidth, open }: SideBarProps) {
  const [openCollapseItem, setOpenCollapseItem] = useState(true)

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

          {/* COLLAPSE BUTTON */}
          <Box>
            {/* <StyledNavLink to="/user-management"> */}
            <ListItemButton
              onClick={() => setOpenCollapseItem(!openCollapseItem)}
              sx={{
                minHeight: 44,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pr: 1.5,
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
                <AdminPanelSettingsOutlinedIcon />
              </ListItemIcon>

              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />

              {openCollapseItem ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
            </ListItemButton>
            {/* </StyledNavLink> */}

            <Collapse in={openCollapseItem} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  mt: 1,
                  position: 'relative',
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    left: '30px',
                    top: 0,
                    height: '100%',
                    width: '1px',
                    opacity: 1,
                    bgcolor: 'primary.main',
                  },
                }}
              >
                {SIDEBAR_TOP_ITEMS.map(({ text, path }) => (
                  <StyledCollapseNavLink key={text} to={path}>
                    <ListItemButton disableRipple={true}>
                      {/* <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {icon}
                      </ListItemIcon> */}

                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </StyledCollapseNavLink>
                ))}
              </List>
            </Collapse>
          </Box>
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
