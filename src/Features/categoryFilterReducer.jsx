import {createSlice,nanoid} from '@reduxjs/toolkit'
const initialState={
    categoryFilter:{}
}
const categoryFilterSlice=createSlice({
    name:'categoryFilter',
    initialState,
    reducers:{
        addCategory:(state,action)=>{
            const category={
                id:nanoid(),
                genre:`with_genres=${action.payload.id}`,
                genreId:action.payload.id,
                genreTitle:action.payload.title,
                genrePrefix:'discover/movie'
            }
            state.categoryFilter=category 
        },
        clearCategory:(state)=>{
            state.categoryFilter={}
        }
    }
})
// export const {addTodo,removeTodo}=todoSlice.actions
// export default todoSlice.reducer
export const {addCategory,clearCategory} =categoryFilterSlice.actions
export default categoryFilterSlice.reducer