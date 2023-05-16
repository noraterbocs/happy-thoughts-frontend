/* eslint-disable no-underscore-dangle */
import { Button, Container, TextareaAutosize, Select, Box, TextField, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThoughts, postNewThought } from 'reducers/thoughts'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistance } from 'date-fns';

// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export const Thoughts = () => {
  const dispatch = useDispatch()
  const [newText, setNewText] = useState('')
  const [newName, setNewName] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  //   const [newCategory, setNewCategory] = useState()
  const allThoughtsList = useSelector((store) => store.thoughts.allThoughts)
  //   const count = useSelector((store) => store.thoughts.allThoughts.totalPages)
  //   const page = useSelector((store) => store.thoughts.page)
  //   const singleThought = useSelector((store) => store.thoughts.singleThought)
  const newThought = useSelector((store) => store.thoughts.newThought)
  const fetchthoughtsAPI = () => {
    dispatch(fetchThoughts())
  }

  const selectCategory = (event) => {
    setSelectedValue(event.target.value);
  };

  const postNewThoughtAPI = () => {
    dispatch(postNewThought(newText, newName))
    setNewName('')
    setNewText('')
  }

  useEffect(() => {
    fetchthoughtsAPI()
  }, [newThought])

  //   const selectThought = (id) => {
  //     setOpen(true)
  //     dispatch(fetchSingleThought(id))
  //   }

  return (
    <Container maxWidth="lg">

      <Container maxWidth="xs" spacing={{ xs: 1, lg: 2 }} sx={{ display: 'flex', flexDirection: 'column', border: '5px solid grey', gap: '2em', justifyContent: 'space-around', padding: '2em' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField id="outlined-basic" label="Your name:" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Select value={selectedValue} onChange={selectCategory} displayEmpty>
            <option value="" disabled>
          Select a category:
            </option>
            <option value="other">Other</option>
            <option value="sport">Sport</option>
            <option value="learning">Learning</option>
            <option value="mental-health">Mental health</option>
            <option value="random">Random</option>
          </Select>
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
            <Grid container spacing={1} sx={{ border: '1px dashed grey', mt: '1em' }} key={thought._id}>
              <Grid item xs={6}><Typography variant="body2">{thought.name}</Typography></Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {formatDistance(new Date(thought.createdAt), Date.now(), { addSuffix: true })}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{thought.text}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}><FavoriteIcon />{thought.heart}</Typography>
              </Grid>
            </Grid>
          )
        })}

      </Container>

    </Container>
  )
}
