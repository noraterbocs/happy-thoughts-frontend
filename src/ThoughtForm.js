/* eslint-disable max-len */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { Button, TextareaAutosize, Select, TextField, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postNewThought } from 'reducers/thoughts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ThoughtForm = () => {
  const dispatch = useDispatch()
  const [newText, setNewText] = useState('')
  const [newName, setNewName] = useState(undefined)
  const [newCategory, setNewCategory] = useState(undefined)
  const [errorMsg, setErrorMsg] = useState(false)

  const selectCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const postNewThoughtAPI = () => {
    dispatch(postNewThought(newText, newName, newCategory))
    setNewName('')
    setNewText('')
    setNewCategory('')
    if (newText.length < 5 || newText.length > 140) {
      setErrorMsg(true)
    } else {
      setErrorMsg(false)
    }
  }

  return (
    <Container maxWidth="xs" spacing={{ xs: 1, lg: 2 }} sx={{ display: 'flex', flexDirection: 'column', border: '1px dashed grey', gap: '2em', justifyContent: 'space-around', alignItems: 'stretch', padding: '2em', bgcolor: '#fff', opacity: '0.8', boxShadow: '12px 12px 2px 1px #7f7b7b', marginTop: '2em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TextField id="outlined-basic" label="Name:" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <FormControl sx={{ minWidth: '50%' }}>
          <InputLabel id="demo-simple-select-helper-label">Category:</InputLabel>
          <Select id="demo-simple-select-helper" labelId="demo-simple-select-helper-label" value={newCategory} onChange={selectCategory} label="Category:" displayEmpty>
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
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Add your thought here" />
      <div className="textarea-footer">
        {errorMsg && <Alert severity="error">Your message has to be between 5 and 140 characters!</Alert>}
        <Typography variant="body2" className="character-counter">{newText.length}/140 characters left</Typography>
      </div>
      <Button
        variant="outlined"
        endIcon={<FavoriteBorderIcon />}
        sx={{ maxWidth: 'max-content',
          alignSelf: 'center',
          color: 'rgb(210 25 145 / 50%)',
          border: '1px solid rgb(210 25 145 / 50%)',
          '&:hover': {
            color: 'rgb(210 25 145 / 100%)',
            border: '1px solid rgb(210 25 145 / 100%)'
          } }}
        onClick={() => postNewThoughtAPI()}>Send happy thoughts!
      </Button>
    </Container>
  )
}