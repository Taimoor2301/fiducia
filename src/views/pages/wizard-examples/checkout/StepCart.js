// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { removeFromCart } from 'src/store/apps/Cart'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        color: theme.palette.text.secondary
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const StepCart = ({ handleNext, data }) => {
  // ** Hooks
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Alert severity='success' icon={<Icon icon='tabler:bookmarks' />} sx={{ mb: 4 }}>
          <AlertTitle>Available Offers</AlertTitle>
          <div>
            <Typography sx={{ color: 'success.main' }}>
              - 10% Instant Discount on Bank of America Corp Bank Debit and Credit cards
            </Typography>
            <Typography sx={{ color: 'success.main' }}>
              - 25% Cashback Voucher of up to $60 on first ever PayPal transaction. TCA
            </Typography>
          </div>
        </Alert>
        <Typography variant='h5' sx={{ mb: 4 }}>
          My Shopping Bag ({data.length} Items)
        </Typography>
        <StyledList sx={{ mb: 4 }}>
          {data.map((el, i) => (
            <Item key={i} item={el} />
          ))}

          {data.length === 0 && <div>No items in cart</div>}
        </StyledList>
      </Grid>
      {data.length > 0 && (
        <Grid item xs={12} lg={4}>
          <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant='h6'>
                Offer
              </Typography>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <CustomTextField fullWidth sx={{ mr: 4 }} placeholder='Enter Promo Code' />
                <Button variant='tonal'>Apply</Button>
              </Box>
            </CardContent>
            <Divider sx={{ my: '0 !important' }} />
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
                  <Typography>Bag Total</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>$1198.00</Typography>
                </Box>
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
                  <Typography>Coupon Discount</Typography>
                  <Typography
                    href='/'
                    variant='h6'
                    component={Link}
                    onClick={e => e.preventDefault()}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Apply Coupon
                  </Typography>
                </Box>
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
                    <Typography sx={{ mr: 2, textDecoration: 'line-through', color: 'text.disabled' }}>
                      $5.00
                    </Typography>
                    <CustomChip rounded size='small' skin='light' color='success' label='Free' />
                  </Box>
                </Box>
              </Box>
            </CardContent>
            <Divider sx={{ my: '0 !important' }} />
            <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Total</Typography>
                <Typography sx={{ fontWeight: 500 }}>$1198.00</Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
            <Button fullWidth={!breakpointMD} variant='contained' disabled={data.length === 0} onClick={handleNext}>
              Place Order
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default StepCart

const Item = ({ item }) => {
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(removeFromCart(item))
  }

  return (
    <ListItem>
      <ListItemAvatar sx={{ display: 'flex', '& img': { my: 5, mx: 8 } }}>
        <img className='rounded max-w-[200px]' src={item.img[0]} alt='iphone 11' />
      </ListItemAvatar>
      <IconButton onClick={handleClick} size='small' className='remove-item' sx={{ color: 'text.primary' }}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
      <Grid container>
        <Grid item xs={12} md={8}>
          <ListItemText primary={item.name} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: 'text.disabled' }}>Sold By:</Typography>
            <Typography
              href='/'
              component={Link}
              onClick={e => e.preventDefault()}
              sx={{ mr: 4, color: 'primary.main', textDecoration: 'none' }}
            >
              GC Suppliers
            </Typography>
            <CustomChip rounded size='small' skin='light' color='success' label='In Stock' />
          </Box>
          <Rating name='iphone-11-rating' value={4} readOnly sx={{ mb: 5.5 }} />
          <CustomTextField type='number' defaultValue='1' sx={{ maxWidth: 100, display: 'block' }} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: [6, 6, 8] }}>
          <Box
            sx={{
              gap: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' }
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ color: 'primary.main' }}>$899</Typography>
              <Typography sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>/$999</Typography>
            </Box>
            <Button variant='tonal' size='small'>
              Move to wishlist
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  )
}
