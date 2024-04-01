import React, { useState } from 'react'
import { Card, CardActions, CardContent, FormControl, Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { t } from 'i18next'

export default function Password() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const [type, setType] = useState('password')

  const s = t('Success')
  const f = t('Something went wrong')

  function changePassword() {
    if (newPassword !== confirmNewPassword) {
      return setErrorMsg('Password are not matching.')
    } else if (newPassword.length < 6) {
      setErrorMsg('Password must be alteast 6 characters long')
    } else {
      setErrorMsg('')
    }
  }

  return (
    <Card style={{ marginTop: '2rem' }}>
      <CardContent>
        <Typography variant='h4'>{t('Update Password')}</Typography>
        <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
          {t('Ensure your account is using a long, random password to stay secure.')}
        </Typography>
        {errorMsg && (
          <Typography sx={{ fontSize: 16, mt: 4 }} color='red' gutterBottom>
            {errorMsg}
          </Typography>
        )}

        <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
          <TextField
            type={type}
            value={password}
            onChange={e => setPassword(e.target.value)}
            label={t('Current Password')}
            size='small'
            fullWidth
          />
          <TextField
            type={type}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            label={t('New Password')}
            size='small'
            fullWidth
            style={{ marginTop: '2rem' }}
          />
          <TextField
            type={type}
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            label={t('Confirm Password')}
            size='small'
            fullWidth
            style={{ marginTop: '2rem' }}
          />
        </FormControl>
      </CardContent>
      <CardActions style={{ justifyContent: 'end', gap: 5 }}>
        <Button
          size='small'
          variant='contained'
          component='span'
          onClick={() => setType(p => (p === 'text' ? 'password' : 'text'))}
        >
          {type === 'text' ? t('Hide Password') : t('Show Password')}
        </Button>
        <Button size='small' variant='contained' component='span' disabled={false} onClick={changePassword}>
          {t('Save')}
        </Button>
      </CardActions>
    </Card>
  )
}
