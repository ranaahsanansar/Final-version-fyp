import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: ""
}


export const connectWallletSlice = createSlice({
    name: 'connectWallet',
    initialState,
    reducers: {
        setAddress: (state , action ) => {
            state.address = action.payload.address
        }
        
    }
})

export const { setAddress } = connectWallletSlice.actions

export default connectWallletSlice.reducer