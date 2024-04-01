// ** Next Import
import Link from 'next/link'

// ** MUI Components
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import forgetpass from '../../assest/images/46.png'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useState } from 'react'
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
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()

  const router = useRouter()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const f = t('No User found with this Email')

  async function handleSubmit(e) {}

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
          <Image
            alt='forget-password'
            src={forgetpass}
            style={{ height: '93vh', objectFit: 'contain', width: '35%' }}
          />
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
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
              <Image
                alt='logo'
                src={theme.palette.mode === 'dark' ? '/logos/logo-white.png' : '/logos/logo-black.png'}
                width={100}
                height={100}
                className='mb-10'
              />
            </Box>
            <Box sx={{ mb: 6, mt: -6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {t('Forgot Password?')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("Enter your email and we'll send you instructions to reset your password")}
              </Typography>
            </Box>
            <form autoComplete='off' onSubmit={handleSubmit}>
              <CustomTextField
                fullWidth
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                type='email'
                label='Email'
                sx={{ display: 'flex', mb: 4 }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                className='text-white text-center py-2 w-full rounded-md hover:bg-opacity-80 disabled:bg-gray-500 mb-5'
                sx={{ mb: 4 }}
              >
                {t('Send reset link')}
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>{t('Back to login')}</span>
                </LinkStyled>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
