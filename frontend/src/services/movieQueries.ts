import gql from "graphql-tag";

export const GET_ALL_MOVIES = gql`
    query getAllMovies {
        getAllMovies {
            id
            title
            release_date
            genres
        }
    }
`;

export const GET_MOVIES_BY_SEARCH = gql`
    query searchMovies($page: Int, $searchGenre: [String], $searchQuery: String, $searchDateStart: Int, $searchDateEnd: Int) {
        getMoviesBySearch(page: $page, searchGenre: $searchGenre, searchQuery: $searchQuery, searchDateStart: $searchDateStart, searchDateEnd: $searchDateEnd) {
            title
            genres
            release_date
        }
    }
`;
