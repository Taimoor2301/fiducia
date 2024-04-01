// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import { Button } from '@mui/base'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { baseURL } from 'src/Constants/Constants'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ButtonBase } from '@mui/material'
import { useTranslation } from 'react-i18next'

// ** Styled Components
const TwoStepsIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

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

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const TwoStepsV2 = () => {
  // ** State
  const [isBackspace, setIsBackspace] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)

  const { t } = useTranslation()

  useEffect(() => {
    const reducer = setInterval(() => {
      if (timer > 0) {
        setTimer(p => p - 1)
      }
    }, 1000)

    return () => clearInterval(reducer)
  }, [timer])

  // ** Hooks
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        required
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='text'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1] }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  const auth = useAuth()

  const router = useRouter()

  let userData = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    if (!data.userId) {
      router.replace('/login')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function resendCode() {
    try {
      await axios.get(baseURL + '/users/users.resendconfirmationemail', {
        params: { tenant: 'root', userId: userData.userId }
      })
      setTimer(60)
      toast.success('Code sent successfully')
    } catch (error) {
      console.log(error)
      toast.error('Error sending code')
    }
  }

  async function verifyOTP(data) {
    const OTP = Object.values(data).join('')

    try {
      setLoading(true)
      await axios.get(baseURL + '/users/users.confirmemailofuserasync', {
        params: { tenant: 'root', userId: userData.userId, code: OTP }
      })

      toast.success('Verification Success')

      await auth.login({ email: userData.userEmail, password: userData.userPassword }, () => {
        router.push('/login')
      })
    } catch (error) {
      console.log(error)
      toast.error('Verification Failed')
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
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <TwoStepsIllustration
            alt='two-steps-illustration'
            src={`/images/pages/auth-v2-two-steps-illustration-${theme.palette.mode}.png`}
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
            <Image
              alt='company logo'
              src={theme.palette.mode === 'dark' ? '/logos/logo-white.png' : '/logos/logo-black.png'}
              width={180}
            />
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t('Two-Step Verification')}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                {t('We sent an OTP to your email. Enter the code from the email in the field below.')}
              </Typography>
              <Typography variant='h6'>{userData.userEmail}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {t('Type your 6 digit security code')}
            </Typography>
            <form onSubmit={handleSubmit(verifyOTP)}>
              <CleaveWrapper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(errorsArray.length && {
                    '& .invalid:focus': {
                      borderColor: theme => `${theme.palette.error.main} !important`,
                      boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                    }
                  })
                }}
              >
                {renderInputs()}
              </CleaveWrapper>
              {errorsArray.length ? (
                <FormHelperText sx={{ color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}>
                  {t('Please enter a valid OTP')}
                </FormHelperText>
              ) : null}
              <Button
                className='bg-[#24C6B7] text-white text-center py-2 w-full rounded-md hover:bg-opacity-80 disabled:bg-gray-500 mb-5'
                type='submit'
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {t('Verify My Account')}
              </Button>
            </form>
            <Box
              sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
              <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
              <Button
                className='bg-[#24C6B7] text-white text-center py-2 w-full rounded-md hover:bg-opacity-80 disabled:bg-gray-500 mb-5'
                type='submit'
                onClick={resendCode}
                disabled={timer > 0}
                sx={{ mt: 2 }}
              >
                {timer > 0 ? `${t('Wait for')} ${timer} ${t('seconds')}` : t('Resend Code')}
              </Button>
            </Box>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
TwoStepsV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

TwoStepsV2.guestGuard = true

export default TwoStepsV2
