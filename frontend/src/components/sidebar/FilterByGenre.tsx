import { FunctionComponent } from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button, { ButtonProps } from '@mui/material/Button';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "../../services/hooks"
import { Dispatch } from "redux";
import MovieService from "../../services/index";
import { getAllMovies } from "../../services/__generated__/getAllMovies"
import { setMovies, setFilterGenres, emptyMovies, removeFilterGenres } from "../../pages/mainPageSlice"


export interface FilterByGenreProps {
  genres: string[];
}

const FilterButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#cccccc',
    color:'#000'
  },
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setMovies: (movies: getAllMovies["getAllMovies"]) => dispatch(setMovies(movies)),
  setFilter: (filter: string) => dispatch(setFilterGenres(filter)),
  removeFilter: (filter: string) => dispatch(removeFilterGenres(filter)),
  emptyMovies: () => dispatch(emptyMovies())
});

export const FilterByGenre: FunctionComponent<FilterByGenreProps> = ({
  genres,
}: FilterByGenreProps) => {

  const { setFilter, removeFilter } = actionDispatch(useAppDispatch())

  const changeBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilter(event.target.name)
    }
    if (!event.target.checked) {
      removeFilter(event.target.name)
    }
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <FormGroup>
          {
            genres.map((genre: string) => ( 
              <FormControlLabel 
                control={
                  <Checkbox name={genre} onChange={(e) => {changeBox(e)}} sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#fff',
                    },
                    '&:hover':{
                      color:'#cccccc',
                    },
                  }}/>
                }
                label={genre}
              /> ))
          }
        {/* <FilterButton variant="contained" endIcon={<MovieCreationOutlinedIcon/>} onClick={() => {fetchMovies()}}>Filter</FilterButton> */}
      </FormGroup>
      
    </Box>
  );
};
