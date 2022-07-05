import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "~/common/interfaces/User.interface";

interface IUserState {
  currentUser: IUser | null
}

const initialState: IUserState = {
  currentUser: null
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