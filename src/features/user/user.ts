import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "~/common/interfaces/User.interface";

interface IUserState {
  currentUser: IUser
}

const initialState: IUserState = {
  currentUser: { email: undefined, loggedIn: false }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, actions) => {
      state.currentUser = actions.payload
    }
  }
})

export default userSlice.reducer
export const { setCurrentUser } = userSlice.actions