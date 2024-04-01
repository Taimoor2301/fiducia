// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'

const notifications = []

const shortcuts = [
  {
    title: 'Reports',
    url: '/reports/site-reports',
    icon: 'tabler:file-invoice',
    subtitle: 'Site Reports'
  },
  {
    title: 'User',
    icon: 'tabler:users',
    url: '/HR-Management/user-management',
    subtitle: 'Manage Users'
  },
  {
    url: '/HR-Management/permissions',
    icon: 'tabler:lock',
    subtitle: 'Permissions',
    title: 'Permissions'
  },
  {
    subtitle: 'Dashboard',
    title: 'Dashboard',
    url: '/dashboards',
    icon: 'tabler:device-analytics'
  },
  {
    title: 'Settings',
    icon: 'tabler:settings',
    url: '/setting'
  }
]

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings } = props

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {auth.user && <Autocomplete hidden={hidden} settings={settings} />}
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {auth.user && (
        <>
          {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
          <NotificationDropdown settings={settings} notifications={notifications} />
          <UserDropdown settings={settings} />
        </>
      )}
    </Box>
  )
}

export default AppBarContent
