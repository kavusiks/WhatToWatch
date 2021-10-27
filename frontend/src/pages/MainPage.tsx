import { FunctionComponent, useEffect } from "react";
import { selectNextPage, selectFilterSearch, selectFilterGenre, selectFilterDateStart, selectFilterDateEnd } from './selectors';
import { useSelector } from "react-redux"
import MovieService from "../services/index";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar/SideBar";
import { Dispatch } from "redux";
import { setMovies } from "./mainPageSlice"
import { getAllMovies } from "../services/__generated__/getAllMovies"
import { useAppDispatch } from "../services/hooks"
import { Row, Col } from "react-bootstrap";
import CustomizedTables from "../components/movies";
import "./MainPage.css";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SortDropDown from "../components/sortdropdown";


const actionDispatch = (dispatch: Dispatch) => ({
  setMovies: (movies: getAllMovies["getAllMovies"]) => dispatch(setMovies(movies))
});

export const MainPage: FunctionComponent = () => {

  const nextPage = useSelector(selectNextPage);
  const filterSearchQuery = useSelector(selectFilterSearch);
  const filterGenre = useSelector(selectFilterGenre);
  const filterDateStart = useSelector(selectFilterDateStart);
  const filterDateEnd = useSelector(selectFilterDateEnd);

  const { setMovies } = actionDispatch(useAppDispatch())
  const fetchMovies = async () => {
    const movies = await MovieService.getMoviesBySearch(
      nextPage,
      filterSearchQuery,
      filterGenre,
      filterDateStart,
      filterDateEnd
    ).catch((error) => {
      console.log("Error", error);
    });
    
    if (movies) {
      console.log("setmovies mainpage")
      setMovies(movies);
    }
  };
  useEffect(() => {
    console.log("useeffect fetchmovies")
    fetchMovies();
  }, []) 

  function fetchMore() {
    console.log("bottomscroll fetchmovies")
    fetchMovies()
  }


  return (
    <>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <div className="innercontainer">
        <SideBar />
        <div className="moviecontainer">
          <SortDropDown />
          <BottomScrollListener onBottom={fetchMore}/>
          <CustomizedTables/>
        </div>
      </div>
    </>
  );
};

export default MainPage;
