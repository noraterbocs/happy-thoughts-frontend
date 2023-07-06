/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThoughts, thoughts } from 'reducers/thoughts'
import { SingleThought } from 'SingleThought';
import { ThoughtForm } from 'ThoughtForm';
import InfiniteScroll from 'react-infinite-scroller';

export const Thoughts = () => {
  const dispatch = useDispatch()
  const allThoughtsList = useSelector((store) => store.thoughts.allThoughts)
  const deletedThought = useSelector((store) => store.thoughts.deletedSingleThought)
  const singleThought = useSelector((store) => store.thoughts.singleThought)
  const newThought = useSelector((store) => store.thoughts.newThought)
  const limit = useSelector((store) => store.thoughts.limit)
  const loading = useSelector((store) => store.ui.isLoading)

  const fetchthoughtsAPI = () => {
    dispatch(fetchThoughts(1, limit))
  }

  useEffect(() => {
    fetchthoughtsAPI()
  }, [newThought, singleThought, deletedThought, limit])

  const loadMore = () => {
    dispatch(thoughts.actions.setLimit(limit + 5));
  };

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadMore}
      hasMore={allThoughtsList.length > 0 && allThoughtsList.length % limit === 0}
      loader={<div className="loader" key={0}>Loading ...</div>}>
      <Container maxWidth="lg" sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '2em' }}>
        {!loading && <ThoughtForm />}
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', gap: '1em', marginBottom: '2em' }}>
          {allThoughtsList.length !== 0
        && allThoughtsList !== undefined
        && allThoughtsList.map((thought) => {
          return (
            <SingleThought key={thought._id} thought={thought} />
          )
        })}
        </Container>
      </Container>
    </InfiniteScroll>
  )
}
