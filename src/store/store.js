import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import questionSlice from './questionSlice'

const store = configureStore({
    reducer: {
         auth : authSlice,
        //TODO: add more slices here for posts
        question:questionSlice

    }
});


export default store;