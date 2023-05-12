import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected : false
}


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setIsConnected: (state , action) => {
            state.isConnected = !state.isConnected
        }
        
    }
})

export const { setIsConnected } = profileSlice.actions

export default profileSlice.reducer