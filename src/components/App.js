import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Login from "./Login";
import Logout from "./Logout";
import PageNotFound from './PageNotFound';
import "./App.css";

function App(props) {
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleInitialData());
  }, []);

  const { authedUser } = props;

  return (
    <Fragment>
      <div className="container">
        {authedUser === null ? (
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes> 
        ) : (
          <div>
            <Nav />
            <Routes>
              <Route path="/dashboard" exact element={<Dashboard/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/add" element={<NewQuestion/>} />
              <Route path="/questions/:id" element={<QuestionPage/>} />
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>

          </div>
        )}
      </div>
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
