import gql from "graphql-tag";

export const GET_MOVIES_BY_SEARCH = gql`
  query searchMovies(
    $page: Int
    $searchGenre: [String]
    $searchQuery: String
    $searchDateStart: Int
    $searchDateEnd: Int
    $sortCriteria: String
  ) {
    getMoviesBySearch(
      page: $page
      searchGenre: $searchGenre
      searchQuery: $searchQuery
      searchDateStart: $searchDateStart
      searchDateEnd: $searchDateEnd
      sortCriteria: $sortCriteria
    ) {
      title
      genres
      release_date
      overview
      poster
    }
  }
`;

export const SET_FAVORITE_MOVIE = gql`
  mutation setMovieAsFavorite(
    $name: String,
    $movieId: String
  ) {
    setMovieAsFavorite(
      name: $name, 
      movie_id: $movieId
    ) {
      favoritedByUser
  }
}
`;

export const REMOVE_MOVIE_AS_FAVORITE = gql`
  mutation removeMovieAsFavorite(
    $name: String, 
    $movieId: String
  ) {
  removeMovieAsFavorite(
    name: $name, 
    movie_id: $movieId
    ) {
    favoritedByUser
  }
}
`
