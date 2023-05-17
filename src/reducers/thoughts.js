import { createSlice } from '@reduxjs/toolkit';
import { ui } from './ui';

export const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    allThoughts: [],
    singleThought: [],
    newThought: [],
    deletedSingleThought: [],
    pageCount: 1,
    limit: 5,
    totalPages: 0

  },
  reducers: {
    setAllThoughts: (state, action) => {
      state.allThoughts = action.payload.result
      state.totalPages = action.payload.totalPages
      console.log(action.payload)
    },
    setPage: (state, action) => {
      state.pageCount = action.payload
      console.log(action.payload)
    },
    setLimit: (state, action) => {
      state.limit = action.payload
      console.log(action.payload)
    },
    setSingleThought: (state, action) => {
      state.singleThought = action.payload
      console.log(action.payload)
    },
    setNewThought: (state, action) => {
      state.newThought = action.payload
      //   state.allThoughts = [...state.allThoughts, action.payload];
      console.log(action.payload)
    },
    setDeleteSingleThought: (state, action) => {
      state.deletedSingleThought = action.payload
      console.log(action.payload)
    }
  }
});

// Fetch all thoughts
export const fetchThoughts = (pageCount, limit) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts?page=${pageCount}&limit=${limit}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setAllThoughts(json.body))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
};

// Post a new thought
export const postNewThought = (newText, newName, newCategory) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newText, name: newName, category: newCategory })
    }
    fetch('https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts', options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setNewThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
};

// PATCH - like a thought
export const likeSingleThought = (id) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts/${id}/like`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setSingleThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}

// PATCH a thought
export const patchSingleThought = (id, editedText, editedCategory) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: editedText, category: editedCategory })
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setSingleThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}

// DELETE a thought
export const deleteSingleThought = (id) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setDeleteSingleThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}
