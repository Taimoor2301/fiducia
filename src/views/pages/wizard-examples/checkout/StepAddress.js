// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomRadioBasic from 'src/@core/components/custom-radio/basic'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

const StepAddress = ({ handleNext, cartItems }) => {
  const initialBasicSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  const initialIconSelected = dataIcons.filter(item => item.isSelected)[
    dataIcons.filter(item => item.isSelected).length - 1
  ].value

  // ** States
  const [selectedIconRadio, setSelectedIconRadio] = useState(initialIconSelected)
  const [selectedBasicRadio, setSelectedBasicRadio] = useState(initialBasicSelected)

  // ** Hook
  const theme = useTheme()
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  const icons = [
    {
      icon: 'tabler:users',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:crown',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-telegram',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
    }
  ]

  const handleBasicRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedBasicRadio(prop)
    } else {
      setSelectedBasicRadio(prop.target.value)
    }
  }

  const handleIconRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedIconRadio(prop)
    } else {
      setSelectedIconRadio(prop.target.value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography sx={{ mb: 4 }} variant='h6'>
          Select your preferable address
        </Typography>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <CustomRadioBasic
              key={index}
              data={data[index]}
              name='custom-radios-address'
              selected={selectedBasicRadio}
              gridProps={{ sm: 6, xs: 12 }}
              handleChange={handleBasicRadioChange}
            />
          ))}
        </Grid>
        <Button variant='tonal' sx={{ mt: 4 }}>
          Add new address
        </Button>
        <Typography variant='h6' sx={{ mt: 6, mb: 4 }}>
          Choose Delivery Speed
        </Typography>
        <Grid container spacing={4}>
          {dataIcons.map((item, index) => (
            <CustomRadioIcons
              key={index}
              data={dataIcons[index]}
              icon={icons[index].icon}
              selected={selectedIconRadio}
              name='custom-radios-delivery'
              gridProps={{ sm: 4, xs: 12 }}
              iconProps={icons[index].iconProps}
              handleChange={handleIconRadioChange}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Estimated Delivery Date
            </Typography>

            {cartItems.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 4, display: 'flex', '& img': { m: 2.5 } }}>
                  <img className='max-w-[100px] rounded' src={item.img[0]} alt='iphone 11' />
                </Box>
                <div>
                  <Typography sx={{ color: 'text.secondary' }}>{item.name}</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>20th Nov 2021</Typography>
                </div>
              </Box>
            ))}
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Price Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Order Total</Typography>
                <Typography sx={{ color: 'text.secondary' }}>$1198.00</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Delivery Charges</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography sx={{ mr: 2, textDecoration: 'line-through', color: 'text.disabled' }}>$5.00</Typography>
                  <CustomChip rounded size='small' skin='light' color='success' label='Free' />
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>$1198.00</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
            Place Order
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepAddress

const data = [
  {
    value: 'home',
    isSelected: true,
    title: 'John Doe (Default)',
    meta: <CustomChip rounded size='small' skin='light' label='Primary' color='primary' />,
    content: (
      <Box sx={{ mt: 0.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ mb: 'auto' }}>
          4135 Parkway Street, Los Angeles, CA, 90017.
          <br />
          Mobile : 1234567890 Cash / Card on delivery available
        </Typography>
        <Divider sx={{ my: 2.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            href='/'
            component={Link}
            sx={{ mr: 3, color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Edit
          </Box>
          <Box
            href='/'
            component={Link}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Remove
          </Box>
        </Box>
      </Box>
    )
  },
  {
    value: 'office',
    title: 'ACME Inc.',
    meta: <CustomChip rounded size='small' skin='light' label='Secondary' color='success' />,
    content: (
      <Box sx={{ mt: 0.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ mb: 'auto' }}>
          87 Hoffman Avenue, New York, NY, 10016.
          <br />
          Mobile : 1234567890 Cash / Card on delivery available
        </Typography>
        <Divider sx={{ my: 2.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            href='/'
            component={Link}
            sx={{ mr: 3, color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Edit
          </Box>
          <Box
            href='/'
            component={Link}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Remove
          </Box>
        </Box>
      </Box>
    )
  }
]

const dataIcons = [
  {
    isSelected: true,
    value: 'standard',
    title: (
      <Typography variant='h6' sx={{ mb: 1 }}>
        Standard
      </Typography>
    ),
    content: (
      <>
        <CustomChip
          rounded
          size='small'
          skin='light'
          label='Free'
          color='success'
          sx={{ top: 12, right: 12, position: 'absolute' }}
        />
        <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
          Get your product in 1 Week.
        </Typography>
      </>
    )
  },
  {
    value: 'express',
    title: (
      <Typography variant='h6' sx={{ mb: 1 }}>
        Express
      </Typography>
    ),
    content: (
      <>
        <CustomChip
          rounded
          label='$10'
          size='small'
          skin='light'
          color='secondary'
          sx={{ top: 12, right: 12, position: 'absolute' }}
        />
        <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
          Get your product in 3-4 days.
        </Typography>
      </>
    )
  },
  {
    value: 'overnight',
    title: (
      <Typography variant='h6' sx={{ mb: 1 }}>
        Overnight
      </Typography>
    ),
    content: (
      <>
        <CustomChip
          rounded
          label='$15'
          size='small'
          skin='light'
          color='secondary'
          sx={{ top: 12, right: 12, position: 'absolute' }}
        />
        <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
          Get your product in 1 day.
        </Typography>
      </>
    )
  }
]
