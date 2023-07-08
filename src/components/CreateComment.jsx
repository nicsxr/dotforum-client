
import { Alert, FormControl, Autocomplete, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { getFollowingCommunities } from '..//services/community.service';
import { createPost } from '../services/post.service';
import { useNavigate, useParams } from 'react-router-dom';
import { createComment } from '../services/comment.service';

const CreateComment = (props) => {
    let navigate = useNavigate()
    const [message, setMessage] = useState('')
    // const message = useRef('')
    const [communities, setCommunities] = useState([])
    const [selectedCommunity, setSelectedCommunity] = useState(null)
    // const data = [{"label": "a"},{"label":"d"}]

    useEffect(() => {

        
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        createComment(data.get('body'), props.postId, props.parentCommentId).then((res) => {
            navigate(0)
        }).catch(() => setMessage("Something went wrong"))
      };
    return (
        <div className='flex justify-center mb-8 text-white'>
            {/* <FormControl component="form" onSubmit={handleSubmit} className="xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 mb-5 bg-slate-700 rounded-2xl"> */}
            <FormControl component="form" onSubmit={handleSubmit} className={`${props.isMainComment ? "xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12" : "w-full"} mb-5 bg-slate-700 rounded-2xl`}>
                {message && 
                    <Alert severity="error" className='mb-3'>Something went wrong...</Alert>
                }
                <div className='p-5 w-full'>
                    <div className='flex'>
                        <TextField name="body" required sx={{marginRight: 1}} className='w-full' size='medium' id="filled-multiline-static" label="Comment" multiline maxRows={3}/>
                        <Button type='submit' size='small' variant="contained" endIcon={<SendIcon />}>Comment</Button>
                    </div>
                </div>
            </FormControl>
        </div>
    );
}

export default CreateComment;
