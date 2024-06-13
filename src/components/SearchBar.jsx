/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { VoteStatus } from '../utils/enums'
import { useNavigate } from 'react-router-dom';
import { votePost } from '../services/post.service';
import { useState } from 'react';
import { Search } from '../services/search.service';

function SearchBar(props) {
  // let post = props.post
  const [searchWord, setSearchWord] = useState('')
  const [searchResults, setsearchResults] = useState([])

  const navigate = useNavigate()


  async function search(e) {
    Search(e.target.value).then((res) => {
      setSearchWord(e.target.value)
      setsearchResults(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>

      <div class='w-2/5 h-2/3 flex'>
        <input class="w-full rounded-lg bg-slate-800 border-slate-700 border-2 text-white p-4" onChange={search}></input>
        {searchResults.length != 0 ?
          <List className='bg-slate-600 rounded-sm w-full border-black border-2'
            sx={{
              width: '100%',
              maxWidth: 500,
              position: 'absolute',
              marginTop: '50px',
              overflow: 'auto',
              maxHeight: 100,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {searchResults.map((res, index) => (
              <li key={`section-${index}`}>
                <ul>
                  {/* <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader> */}
                    <ListItem key={`item-${index}------`}>
                      <Avatar sx={{marginRight: '5px'}}>{res.name[0].toUpperCase()}</Avatar>
                      <ListItemText primary={`${res.name}`} />
                    </ListItem>
                </ul>
              </li>
            ))}
          </List>
          : ''}
      </div>

      {/* <Autocomplete
          className="p-3 m-3 mt-5 w-2/5"
          id="free-solo-demo"
          freeSolo
          onInputChange={search}
          options={searchResults.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} label="Search" />}
        /> */}
    </>
  )
}

export default SearchBar
