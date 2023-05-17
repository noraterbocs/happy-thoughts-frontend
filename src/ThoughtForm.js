
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { Button, TextareaAutosize, Select, TextField, MenuItem, FormControl, InputLabel, Box, Container } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postNewThought } from 'reducers/thoughts'

export const ThoughtForm = () => {
  const dispatch = useDispatch()
  const [newText, setNewText] = useState('')
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')

  const selectCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const postNewThoughtAPI = () => {
    dispatch(postNewThought(newText, newName, newCategory))
    setNewName('')
    setNewText('')
    setNewCategory('')
  }

  return (
    <Container maxWidth="xs" spacing={{ xs: 1, lg: 2 }} sx={{ display: 'flex', flexDirection: 'column', border: '1px dashed grey', gap: '2em', justifyContent: 'space-around', padding: '2em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TextField id="outlined-basic" label="Name:" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <FormControl sx={{ minWidth: '50%' }}>
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
  )
}