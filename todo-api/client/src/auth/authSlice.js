import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {
    email: '',
    password: ''
  },
  loggedInStatus: 'NOT_LOGGED_IN'
}

//actions

export const checkLoginStatus = createAsyncThunk('auth/checkLoginStatus', async () => {
  const response = await axios.get("http://localhost:3001/logged_in", { withCredentials: true })
  return response.data
})


export const addNewUser = createAsyncThunk(
  'auth/addNewUser',
  async initialUser => {
    console.log('adding:', initialUser)
    const response = await axios.post("http://localhost:3001/registrations", { user: initialUser }, { withCredentials: true })
    console.log('registered user:', response.data)
    return response.data
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async loginUser => {
    const response = await axios.post("http://localhost:3001/sessions", { user: loginUser }, { withCredentials: true })
    console.log('logged in user:', response.data.user)
    return response.data
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async => {
    axios.delete("http://localhost:3001/logout", { withCredentials : true})
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [addNewUser.fulfilled]: (state, action) => {
      // console.log("new user data:", action.payload)
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.loggedInStatus = 'LOGGED_IN'
      //include portion on gathering data for this specific user
    },
    [logoutUser.fulfilled]: (state,_) => {
      state.user = initialState.user
      state.loggedInStatus = 'NOT_LOGGED_IN'
      console.log('successfully logged out')
    },
    [checkLoginStatus.fulfilled]: (state, action) => {
      if (action.payload.logged_in && state.loggedInStatus === 'NOT_LOGGED_IN') {
        state.user = action.payload.user
        state.loggedInStatus = 'LOGGED_IN'
      } else if(!action.payload.logged_in && state.loggedInStatus === 'LOGGED_IN') {
        state = initialState
      }
    }
  }
})

export default authSlice.reducer

//state selectors