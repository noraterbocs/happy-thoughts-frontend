/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { Tooltip, IconButton, Grid, Typography, TextareaAutosize, TextField } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistance } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSingleThought, likeSingleThought, patchSingleThought } from 'reducers/thoughts';

export const SingleThought = ({ thought }) => {
  const [editedText, setEditedText] = useState('')
  const [editedCategory, setEditedCategory] = useState('')
  const dispatch = useDispatch()
  const changeSingleThought = (e, id, changeType) => {
    const { value } = e.target;
    if (changeType === 'text') {
      setEditedText((prevState) => ({ prevState, [id]: value }))
    } else if (changeType === 'category') {
      setEditedCategory((prevState) => ({ prevState, [id]: value }))
      console.log(editedCategory, editedCategory[id])
    }
  }

  const patchSingleThoughtAPI = (id) => {
    dispatch(patchSingleThought(id, editedText[id], editedCategory[id]))
  }
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
}
