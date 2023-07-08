import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/user.service';
import { Alert } from '@mui/material';




export default function Registration() {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await registerUser(data.get('username'), data.get('password')).then((res) => {
            if(res.status.code == 1) navigate('/')
            else {setMessage(res.status.message)}
        }).catch((err) => {
            console.log(err)
            setMessage(err.message)
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <AccountCircleOutlinedIcon fontSize='large' />
                <Typography component="h1" variant="h5">Register</Typography>
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
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <div className='text-center'>
                        <Link href="/login" variant="body2">
                            {"Already have an account? Login"}
                        </Link>
                    </div>
                </Box>
            </Box>
        </Container>
    );
}