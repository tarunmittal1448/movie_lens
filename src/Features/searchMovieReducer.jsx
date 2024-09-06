import {createSlice,nanoid} from '@reduxjs/toolkit'
const initialState={
    searchMovie:{}
}
const searchMovieSlice=createSlice({
    name:'searchMovie',
    initialState,
    reducers:{
        addSearch:(state,action)=>{
            const movie={
                id:nanoid(),
                text:action.payload,
                prefix:"search/movie",
                query:`query=${action.payload}`
            }
            state.searchMovie=movie
        }
    }
})
// export const {addLanguage} =languageFilterSlice.actions
// export default languageFilterSlice.reducer
export const {addSearch} =searchMovieSlice.actions
export default searchMovieSlice.reducer