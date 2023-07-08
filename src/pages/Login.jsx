import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { userLoggedIn } from '../features/authActions';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { Alert } from '@mui/material';
import { getUser } from '../services/user.service';




export default function SignIn() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: data.get('username'),
  //     password: data.get('password'),
  //   });
  //   dispatch(userLogin(data.get('username'), data.get('password')))
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login(data.get('username'), data.get('password')).then((res) => {
        if(res.status.code == 1){
          dispatch(userLoggedIn())
          navigate('/')
        } 
        else {setMessage(res.status.message)}
    }).catch((err) => {
        console.log(err)
        setMessage(err.message)
    })
};

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {message && 
                <Alert severity="error" className='mb-3'>{message}</Alert>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              defaultValue="string"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue="string"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}