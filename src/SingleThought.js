/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { Tooltip, IconButton, Grid, Typography, TextareaAutosize, TextField, Container } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistance } from 'date-fns';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSingleThought, likeSingleThought, patchSingleThought } from 'reducers/thoughts';
import { Likes } from 'Likes';

export const SingleThought = ({ thought }) => {
  const [editedText, setEditedText] = useState('')
  const [editedCategory, setEditedCategory] = useState('')
  const [showLikes, setShowLikes] = useState(false);
  const dispatch = useDispatch()
  const playerRef = useRef();
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

  const addLike = () => {
    dispatch(likeSingleThought(thought._id))
    setShowLikes(true)
    playerRef.current.play();
  }
  return (
    <Container>
      <Grid container spacing={2} mt={0} sx={{ border: '1px dashed grey', padding: '2em 1em', position: 'relative', margin: '0', width: '100%', bgcolor: '#fff', opacity: '0.8', boxShadow: '12px 12px 2px 1px #7f7b7b' }} key={thought._id}>
        <Grid item xs={12}>
          <TextField variant="standard" value={editedCategory[thought._id] || thought.category} onChange={(e) => changeSingleThought(e, thought._id, 'category')} onBlur={() => patchSingleThoughtAPI(thought._id)} />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            variant="body1"
            minRows={5}
            maxRows={5}
            sx={{ width: '100%' }}
            value={editedText[thought._id] || thought.text}
            onChange={(e) => changeSingleThought(e, thought._id, 'text')}
            onBlur={() => patchSingleThoughtAPI(thought._id)} />
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Like">
            <IconButton sx={{ fontSize: '1em', position: 'relative' }} onClick={() => addLike()}>
              <span>  {thought.heart} x </span>
              <FavoriteIcon />
              {showLikes && <Likes playerRef={playerRef} />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            <span>Sent by {thought.name} </span>
            {formatDistance(new Date(thought.createdAt), Date.now(), { addSuffix: true })}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ position: 'absolute', top: '0', right: '0' }}>
          <Tooltip title="Delete">
            <IconButton onClick={() => dispatch(deleteSingleThought(thought._id))}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  )
}
