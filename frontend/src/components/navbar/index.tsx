import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "./index.css";
import { alpha, styled } from "@mui/material/styles";
import {
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../services/hooks"
import { Dispatch } from "redux";
import MovieService from "../../services/index";
import { getAllMovies } from "../../services/__generated__/getAllMovies"
import { useSelector } from "react-redux"
import { setMovies, emptyMovies, setSearchQuery } from "../../pages/mainPageSlice"
import { selectStateExceptMovies } from '../../pages/selectors';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setMovies: (movies: getAllMovies["getAllMovies"]) => dispatch(setMovies(movies)),
  setSearch: (query: string) => dispatch(setSearchQuery(query)),
  emptyMovies: () => dispatch(emptyMovies())
});

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [localSearch, setLocalSearch] = React.useState<string>("")

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setMovies, setSearch, emptyMovies} = actionDispatch(useAppDispatch())
  const state = useSelector(selectStateExceptMovies)
  const fetchMovies = async () => {
    emptyMovies();
    const movies = await MovieService.getMoviesBySearch(state).catch((error) => {
      console.log("Error", error);
    });
    if(movies) {
      console.log("setmovies navbar")
      setMovies(movies);
    }
  }

  /* React.useEffect(() => {
  }, [onSearch]) 
  
  USE TO FIX BUG: update other states

  */

  const keyPress = (event: any) => {
    if (event.keyCode === 13) {
      setSearch(localSearch)
      fetchMovies()
    }
  };

  function inputChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setLocalSearch(event.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navBar">
        <Toolbar>
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "left",
            }}
            className="text-navbar"
          >
            What to Watch?
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={keyPress}
              onChange={(event) => {inputChange(event)}}
              autoFocus={true}
            />
          </Search>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Log out</MenuItem>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
