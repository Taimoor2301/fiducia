const navigation = () => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Dashboard',
      path: '/dashboard',
      role: 'admin'
    },

    {
      title: 'Settings',
      path: '/setting',
      icon: 'tabler:settings',
      role: 'admin'
    }
  ]
}

export default navigation
