import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import connectWalletReducer from "../features/connectWallet";

export const store = configureStore({
    reducer: {
        connectWallet : connectWalletReducer
    }
})

setupListeners(store.dispatch)



