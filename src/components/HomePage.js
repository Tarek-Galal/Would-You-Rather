import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

class HomePage extends Component {
  state = {
    showAnsweredQuestions: false,
  };

  setShow = (val) => {
    this.setState({ showAnsweredQuestions: val });
  };

  renderQuestions = () => {
    const { showAnsweredQuestions } = this.state;
    const {
      history,
      users,
      loggedInUser,
      answeredQuestions,
      unansweredQuestions,
    } = this.props;

    let requiredQuestions = showAnsweredQuestions
      ? answeredQuestions
      : unansweredQuestions;

    return requiredQuestions.map((question) => (
      <div className="question-card" key={question.id}>
        <article>
          {users[question.author].id === loggedInUser.id
            ? "You"
            : users[question.author].name}{" "}
          asks:
        </article>
        <main>
          <div className="question-detail">
            <div className="game-name">Would you rather</div>
            <button
              onClick={() => {
                history.push(`/questions/${question.id}`);
              }}
            >
              View Poll
            </button>
          </div>
          <div className="avatar">
            <img src={users[question.author].avatarURL} alt="avatar" />
          </div>
        </main>
      </div>
    ));
  };

  render() {
    const { showAnsweredQuestions } = this.state;
    return (
      <div className="home-page">
        <header>
          <div
            className="unanswered"
            onClick={() => this.setShow(false)}
            style={{
              background: showAnsweredQuestions ? "none" : "#364f6b",
              color: showAnsweredQuestions ? "#364f6b" : "white",
            }}
          >
            UnAnswered Questions
          </div>
          <div
            onClick={() => this.setShow(true)}
            className="answered"
            style={{
              background: showAnsweredQuestions ? "#364f6b" : "none",
              color: showAnsweredQuestions ? "white" : "#364f6b",
            }}
          >
            Answered Questions
          </div>
        </header>

        <section>
          <div className="question-cards">{this.renderQuestions()}</div>
        </section>
      </div>
    );
  }
}

const sortByTimestamp = (allQuestions) => {
  return _.sortBy(allQuestions, [(q) => q.timestamp]).reverse();
};

const mapStateToProps = (state) => {
  const { questions, loggedInUser, users } = state;
  const allQuestions = Object.keys(questions).map((key) => questions[key]);
  const sortedQuestions = sortByTimestamp(allQuestions);
  const answeredQuestions = sortedQuestions.filter(
    (question) =>
      question.optionOne.votes.includes(loggedInUser.id) ||
      question.optionTwo.votes.includes(loggedInUser.id)
  );
  const unansweredQuestions = sortedQuestions.filter(
    (question) =>
      !question.optionOne.votes.includes(loggedInUser.id) &&
      !question.optionTwo.votes.includes(loggedInUser.id)
  );

  return {
    users,
    loggedInUser,
    answeredQuestions,
    unansweredQuestions,
  };
};

export default connect(mapStateToProps)(HomePage);
