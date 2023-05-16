import { createSlice } from '@reduxjs/toolkit';
import { ui } from './ui';

export const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    allThoughts: [],
    singleThought: [],
    newThought: [],
    page: 1,
    limit: 20

  },
  reducers: {
    setAllThoughts: (state, action) => {
      state.allThoughts = action.payload
      console.log(action.payload)
    },
    setPage: (state, action) => {
      state.page = action.payload
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
    }
  }
});

// a thunk to handle the API request
export const fetchThoughts = (page) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts?page=${page}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setAllThoughts(json.body.result))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
};

export const postNewThought = (newText, newName) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newText, name: newName })
    }
    fetch('https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts', options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setNewThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
};

export const fetchSingleThought = (id) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setSingleThought(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}

// PATCH
export const patchSingleThought = (id) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`https://project-happy-thoughts-api-lyyw357xda-lz.a.run.app/thoughts/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(thoughts.actions.setSingleThought(json.body.result))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}

// DELETE
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
    //   .then((json) => {
    //     dispatch(thoughts.actions.setSingleThought(json))
    //   })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };
}
