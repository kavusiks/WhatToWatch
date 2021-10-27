import { createSlice } from "@reduxjs/toolkit"
import IMoviesList from "../services/types"

const initialState: IMoviesList = {
    movies: [],
    loading: false,
    nextPage: 0,
    filterSearch: "",
    filterGenre: [],
    filterDateStart: -1635203598,
    filterDateEnd: 1635203598
}

const MainPageSlice = createSlice({
    name: "mainPage",
    initialState,
    reducers: {
        setMovies(state, action) {
            console.log("next page", state.nextPage)
            state.nextPage += 1
            if (state.movies !== null) {
                state.movies = state.movies.concat(action.payload)
            }
        },
        setFilterStartDate(state, action) {
            console.log(action.payload, "date")
            state.filterDateStart = action.payload
        },
        setFilterEndDate(state, action) {
            state.filterDateEnd = action.payload
        },
        setSearchQuery(state, action) {
            state.nextPage = 0
            state.movies = []
            state.filterSearch = action.payload
        },
        setFilterGenres(state, action) {
            console.log("Payload", action.payload)
            state.nextPage = 0
            state.movies = []
            state.filterGenre = action.payload
        },
        emptyMovies(state) {
            console.log("Emptying movies")
            state.nextPage = 0
            state.movies = []
        }
    },
})

export const { setMovies, setFilterGenres, emptyMovies, setFilterEndDate, setFilterStartDate, setSearchQuery} = MainPageSlice.actions
export default MainPageSlice.reducer