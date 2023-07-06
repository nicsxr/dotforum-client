
import { Alert, FormControl, Autocomplete, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { getFollowingCommunities } from '..//services/community.service';
import { createPost } from '../services/post.service';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    let navigate = useNavigate()
    const [message, setMessage] = useState('')
    // const message = useRef('')
    const [communities, setCommunities] = useState([])
    const [selectedCommunity, setSelectedCommunity] = useState(null)
    // const data = [{"label": "a"},{"label":"d"}]
    
    useEffect(() => {
        getFollowingCommunities().then((res) => {
            setCommunities(res.data.map(obj => ({ ...obj, label: obj.name })))
        }).catch((err) => {
            setMessage(err)
        })
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        createPost(data.get('title'), data.get('body'), selectedCommunity.id).then((res) => {
            navigate(`/post/${res.data.postId}`)
        })
      };
    return (
        <div className='flex justify-center mb-8 text-white'>
            <FormControl component="form" onSubmit={handleSubmit} className="xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 mb-5 bg-slate-950 rounded-2xl">
            {message && 
                <Alert severity="error" className='mb-3'>Something went wrong...</Alert>
            }
                <div className='p-5 w-full'>
                    <div className='flex'>
                        <Autocomplete size='small' className='mb-2' value={selectedCommunity} onChange={(event, newValue) => { setSelectedCommunity(newValue); }} id="controllable-states-demo" options={communities} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Controllable" />} />
                        {/* <Autocomplete size="small" className='mb-2' disablePortal id="combo-box-demo" options={communities} sx={{ width: 350, marginRight: 1 }} renderInput={(params) => <TextField {...params} label="Community" />} /> */}
                        <TextField name="title" size="small" className='w-full' required id="outlined-required" label="Post title"/>
                    </div>
                    <div className='flex'>
                        <TextField name="body" required sx={{marginRight: 1}} className='w-full' size='small' id="filled-multiline-static" label="Post content" multiline rows={3} variant="filled" />
                        <Button type='submit' size='small' variant="contained" endIcon={<SendIcon />}>Post</Button>
                    </div>
                </div>
            </FormControl>
        </div>
    );
}

export default CreatePost;
