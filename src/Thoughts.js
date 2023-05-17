/* eslint-disable no-underscore-dangle */
import { Button, Container, TextareaAutosize, Select, TextField, Typography, Grid, MenuItem, FormControl, InputLabel, Box, Tooltip, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSingleThought, fetchThoughts, likeSingleThought, patchSingleThought, postNewThought } from 'reducers/thoughts'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistance } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export const Thoughts = () => {
  const dispatch = useDispatch()
  const [newText, setNewText] = useState('')
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [editedText, setEditedText] = useState('')
  const [editedCategory, setEditedCategory] = useState('')
  const allThoughtsList = useSelector((store) => store.thoughts.allThoughts)
  //   const count = useSelector((store) => store.thoughts.allThoughts.totalPages)
  const deletedThought = useSelector((store) => store.thoughts.deletedSingleThought)
  const singleThought = useSelector((store) => store.thoughts.singleThought)
  const newThought = useSelector((store) => store.thoughts.newThought)
  const fetchthoughtsAPI = () => {
    dispatch(fetchThoughts())
  }

  const selectCategory = (event) => {
    setNewCategory(event.target.value);
  };

  //   const changeCategory = (event) => {
  //     console.log(event.target.value)
  //   };

  const postNewThoughtAPI = () => {
    dispatch(postNewThought(newText, newName, newCategory))
    setNewName('')
    setNewText('')
    setNewCategory('')
  }

  const changeSingleThought = (e, id, changeType) => {
    const { value } = e.target;
    if (changeType === 'text') {
      setEditedText((prevState) => ({ prevState, [id]: value }))
      console.log(editedText, editedText[id])
    } else if (changeType === 'category') {
      setEditedCategory((prevState) => ({ prevState, [id]: value }))
      console.log(editedCategory, editedCategory[id])
    }
  }

  const patchSingleThoughtAPI = (id) => {
    dispatch(patchSingleThought(id, editedText[id], editedCategory[id]))
  }

  useEffect(() => {
    fetchthoughtsAPI()
  }, [newThought, singleThought, deletedThought])

  return (
    <Container maxWidth="lg">

      <Container maxWidth="xs" spacing={{ xs: 1, lg: 2 }} sx={{ display: 'flex', flexDirection: 'column', border: '5px solid grey', gap: '2em', justifyContent: 'space-around', padding: '2em' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <TextField id="outlined-basic" label="Name:" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Category:</InputLabel>
            <Select id="demo-simple-select-helper" labelId="demo-simple-select-helper-label" value={newCategory} onChange={selectCategory} label="Age" displayEmpty>
              <MenuItem value="" disabled />
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Learning">Learning</MenuItem>
              <MenuItem value="Mental health">Mental health</MenuItem>
              <MenuItem value="Random">Random</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextareaAutosize
          minRows={6}
          value={newText}
          onChange={(e) => setNewText(e.target.value)} />
        <Button onClick={() => postNewThoughtAPI()}>Send happy thoughts!</Button>
      </Container>
      <Container maxWidth="xs">
        {allThoughtsList.length !== 0
        && allThoughtsList !== undefined
        && allThoughtsList.map((thought) => {
          return (
            <Grid container spacing={1} sx={{ border: '1px dashed grey', padding: '1em' }} key={thought._id}>
              <Grid item xs={4}><Typography variant="body2">{thought.name}</Typography></Grid>
              <Grid item xs={4}>
                <TextField variant="standard" value={editedCategory[thought._id] || thought.category} onChange={(e) => changeSingleThought(e, thought._id, 'category')} onBlur={() => patchSingleThoughtAPI(thought._id)} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">
                  {formatDistance(new Date(thought.createdAt), Date.now(), { addSuffix: true })}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextareaAutosize variant="body1" value={editedText[thought._id] || thought.text} onChange={(e) => changeSingleThought(e, thought._id, 'text')} onBlur={() => patchSingleThoughtAPI(thought._id)} />
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Like">
                  <IconButton onClick={() => dispatch(likeSingleThought(thought._id))}>
                    <FavoriteIcon />
                    {thought.heart}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Delete">
                  <IconButton onClick={() => dispatch(deleteSingleThought(thought._id))}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )
        })}

      </Container>

    </Container>
  )
}
