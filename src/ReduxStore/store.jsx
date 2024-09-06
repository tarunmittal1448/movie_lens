import {configureStore} from "@reduxjs/toolkit"
import categoryFilterReducer from "../Features/categoryFilterReducer"
import languageFilterReducer from "../Features/languageFilterReducer"
import searchMovieReducer from "../Features/searchMovieReducer"
import { combineReducers } from "@reduxjs/toolkit"
const rootReducer=combineReducers({
    category:categoryFilterReducer,
    language:languageFilterReducer,
    search:searchMovieReducer
})
export const store=configureStore({
    reducer:rootReducer
})