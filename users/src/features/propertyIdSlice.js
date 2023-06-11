import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propertyId : "gsdgsg"
}


export const propertyIdSlice = createSlice({
    name: 'propertyId',
    initialState,
    reducers:{
        setPropertyId: (state , action) => {
            state.id = action.payload.propertyId
        }
    }
})

export const {setPropertyId} = propertyIdSlice.actions

export default propertyIdSlice.reducer;