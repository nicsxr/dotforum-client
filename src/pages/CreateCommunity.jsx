import {useEffect, useState} from 'react'
import { getCommentsByPostId, getPostById } from '../services/post.service';
import { VoteStatus } from '../utils/enums'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ForumIcon from '@mui/icons-material/Forum';
import CommentsList from '../components/CommentsList';
import CreateComment from '../components/CreateComment';
import { useSelector } from 'react-redux';
import Post from '../components/Post';

import { Alert, FormControl, Autocomplete, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { createCommunity } from '../services/community.service';

function CreateCommunity() {
    let navigate = useNavigate()
    const [message, setMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        createCommunity(data.get('communityName'), data.get('communityDescription'))
        .then((res) => {
            navigate(0)
        }).catch(() => setMessage("Something went wrong..."))
      };
    return (
        <div className='flex justify-center mb-8 text-white'>
            <FormControl component="form" onSubmit={handleSubmit} className="xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 mb-5 bg-slate-700 rounded-2xl">
                {message && 
                    <Alert severity="error" className='mb-3'>{message}</Alert>
                }
                <div className='p-5 w-full'>
                    <TextField name="communityName" required sx={{marginRight: 1, marginBottom: 2}} className='w-full' size='small' id="filled-multiline-static" label="Community Name" multiline maxRows={3}/>
                    <TextField name="communityDescription" required sx={{marginRight: 1, marginBottom: 2}} className='w-full' size='small' id="filled-multiline-static" label="Community Description" multiline maxRows={3}/>
                    <Button type='submit' size='small' variant="contained" endIcon={<AddIcon />}>Create</Button>
                </div>
            </FormControl>
        </div>
    );
}

export default CreateCommunity