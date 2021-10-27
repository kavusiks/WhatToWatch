import { FunctionComponent, useState } from "react";
import React, { useEffect } from "react";
import { selectNextPage, selectFilterSearch, selectFilterGenre, selectFilterDateStart, selectFilterDateEnd, selectStateExceptMovies } from './selectors';
import { useSelector } from "react-redux"
import MovieService from "../services/index";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar/SideBar";
import { Dispatch } from "redux";
import { setMovies } from "./mainPageSlice"
import { getAllMovies, getAllMovies_getAllMovies } from "../services/__generated__/getAllMovies"
import { useAppDispatch } from "../services/hooks"
import { Layout } from 'antd';
import { Row, Col, Nav } from "react-bootstrap";
import CustomizedTables from "../components/movies";
import './MainPage.css';
import { BottomScrollListener } from "react-bottom-scroll-listener";

const { Header, Content, Sider } = Layout;

const actionDispatch = (dispatch: Dispatch) => ({
  setMovies: (movies: getAllMovies["getAllMovies"]) => dispatch(setMovies(movies))
});

export const MainPage: FunctionComponent = () => {
  const { setMovies } = actionDispatch(useAppDispatch())
  const state = useSelector(selectStateExceptMovies)
  const fetchMovies = async () => {
    const movies = await MovieService.getMoviesBySearch(state).catch((error) => {
      console.log("Error", error);
    });
    if(movies) {
      setMovies(movies);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []) 


  return (
    <>
      <Row>
        <Col>
          <NavBar/>
        </Col>
      </Row>
      <div className ="innercontainer">
        <SideBar />
        <div className="moviecontainer">
          <BottomScrollListener onBottom={fetchMovies}/>
          <CustomizedTables/>
        </div>
      </div>
    </>
  );
};


export default MainPage;
