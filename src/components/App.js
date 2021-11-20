import React from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { fetchQuestions, fetchUsers } from "../redux/actions";

import LoginPage from "./LogInPage";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import NotFoundPage from "./NotFoundPage";

import LoadingBar from "react-redux-loading-bar";

import "./App.scss";

const requireAuthorization = (AuthorizedComponent) => {
  return class LogInFirst extends React.Component {
    componentDidMount() {
      const { loggedInUser, history, location } = this.props;
      if (!loggedInUser.id) {
        history.push({
          pathname: "/login",
          state: { returnPath: location.pathname },
        });
      }
    }

    componentDidUpdate() {
      const { loggedInUser, history, location } = this.props;
      if (!loggedInUser.id) {
        history.push({
          pathname: "/login",
          state: { returnPath: location.pathname },
        });
      }
    }

    render() {
      return <AuthorizedComponent {...this.props} />;
    }
  };
};

const HomePageWithAuth = requireAuthorization(HomePage);
const QuestionPageWithAuth = requireAuthorization(QuestionPage);
const LeaderBoardWithAuth = requireAuthorization(LeaderBoard);
const AddQuestionWithAuth = requireAuthorization(AddQuestion);
const NotFoundPageWithAuth = requireAuthorization(NotFoundPage);

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchQuestions();
  }

  render() {
    const { loggedInUser, users, questions } = this.props;

    return Object.keys(users).length === 0 ||
      Object.keys(questions).length === 0 ? null : (
      <div className="App">
        <header>
          <LoadingBar />
        </header>
        <div className="wrapper">
          <Navbar />
          <Switch>
            <Route
              path="/leaderboard"
              component={(props) => (
                <LeaderBoardWithAuth loggedInUser={loggedInUser} {...props} />
              )}
            />
            <Route
              path="/add"
              component={(props) => (
                <AddQuestionWithAuth loggedInUser={loggedInUser} {...props} />
              )}
            />
            <Route
              path="/questions/:question_id"
              component={(props) => (
                <QuestionPageWithAuth loggedInUser={loggedInUser} {...props} />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route
              exact
              path="/"
              component={(props) => (
                <HomePageWithAuth loggedInUser={loggedInUser} {...props} />
              )}
            />

            <Route
              path="/"
              component={(props) => (
                <NotFoundPageWithAuth loggedInUser={loggedInUser} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  loggedInUser: state.loggedInUser,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
