// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import themeConfig from 'src/configs/themeConfig'

// ** MUI Components
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Image from 'next/image'
import signup from '../../../assest/images/man_13.png'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useTranslation } from 'react-i18next'
import { signUpCheck } from 'src/utils/utils'
import axios from 'axios'
import { baseURL } from 'src/Constants/Constants'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  })

  async function hanldeSubmit(e) {
    e.preventDefault()
    const errorMsg = signUpCheck(data)
    if (errorMsg) return setErrorMessage(errorMsg)

    setErrorMessage('')

    try {
      setLoading(true)

      const res = await axios.post(
        baseURL + '/users/users.createuseranonymouslyasync',
        { ...data },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            tenant: 'root'
          }
        }
      )

      localStorage.setItem(
        'userInfo',
        JSON.stringify({ userId: res.data.data, userEmail: data.email, userPassword: data.password })
      )

      router.push('/enterOTP')

      // await auth.login({email:data.email , password:data.password}, () => toast.error('Login failed'))
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.messages[0] || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',

            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(5, 0, 5, 8)
          }}
        >
          <Image alt='signup' src={signup} style={{ height: '93vh', objectFit: 'contain', width: '50%' }} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box md={{ width: '100%', maxWidth: 400, mt: -20 }} sx={{ width: '100%', maxWidth: 400, mt: -10 }}>
            <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center', mb: 7 }}>
              <Image
                alt='logo'
                src={theme.palette.mode === 'dark' ? '/logos/logo-white.png' : '/logos/logo-black.png'}
                width={100}
                height={100}
              />
            </Box>
            <Box sx={{ mb: 2, mt: -6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t('Welcome to') + ' ' + themeConfig.templateName + '!' + '👋🏻'}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('Please sign-up to your account and start the adventure')}
              </Typography>
              {errorMessage && (
                <Typography sx={{ color: 'red', textAlign: 'center', py: '5px' }}>{t(errorMessage)}</Typography>
              )}
            </Box>
            <form onSubmit={hanldeSubmit}>
              <CustomTextField
                autoFocus
                required
                fullWidth
                sx={{ mb: 4 }}
                label={t('Username')}
                placeholder='johndoe'
                value={data.userName}
                onChange={e => setData(p => ({ ...p, userName: e.target.value }))}
              />
              <CustomTextField
                required
                fullWidth
                sx={{ mb: 4 }}
                label={t('First Name')}
                placeholder='john'
                value={data.firstName}
                onChange={e => setData(p => ({ ...p, firstName: e.target.value }))}
              />
              <CustomTextField
                required
                fullWidth
                sx={{ mb: 4 }}
                label={t('Last Name')}
                placeholder='doe'
                value={data.lastName}
                onChange={e => setData(p => ({ ...p, lastName: e.target.value }))}
              />
              <CustomTextField
                required
                type='email'
                fullWidth
                sx={{ mb: 4 }}
                label={t('Email')}
                placeholder='example@mail.com'
                value={data.email}
                onChange={e => setData(p => ({ ...p, email: e.target.value }))}
              />
              <CustomTextField
                required
                fullWidth
                sx={{ mb: 4 }}
                label={t('Phone Number')}
                placeholder='+555-555-555'
                value={data.phoneNumber}
                onChange={e => setData(p => ({ ...p, phoneNumber: e.target.value }))}
              />
              <CustomTextField
                fullWidth
                required
                sx={{ mb: 4 }}
                label={t('Password')}
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={e => setData(p => ({ ...p, password: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <CustomTextField
                fullWidth
                required
                value={data.confirmPassword}
                sx={{ mb: 4 }}
                label={t('Confirm Password')}
                type={showPassword ? 'text' : 'password'}
                onChange={e => setData(p => ({ ...p, confirmPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                className='bg-[#24C6B7] text-white text-center py-2 w-full rounded-md hover:bg-opacity-80 disabled:bg-gray-500 mb-5'
                sx={{ mb: 4 }}
              >
                {t('Register')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>{t('Already have an account?')}</Typography>
                <Typography component={LinkStyled} href='/auth/login'>
                  {t('Sign in instead')}
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
