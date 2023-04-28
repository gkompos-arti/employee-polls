import React from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, Container, Typography } from "@mui/material";



const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  
  let navigate = useNavigate();
  const { question, author, authedUser, dispatch, hasAnswered, optionAnswer } = props;
  const { optionOne, optionTwo } = question;
  const { name, avatarURL, id } = author;
 
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercentage = ((optionOne.votes.length / totalVotes) * 100).toFixed(2);
  const optionTwoPercentage = ((optionTwo.votes.length / totalVotes) * 100).toFixed(2);

  const handleAnswer = (e, qid) => {
    e.preventDefault();
    const answer = e.target.value;

    dispatch(handleAddAnswer(qid, answer));
    navigate("/dashboard");
  };

  if (question === null) {
    navigate('*')
  }

  return (
  <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <h2>Poll by {id}</h2>
    <img className="pollAvatar" src={avatarURL} alt={`Avatar of ${name}`} />
    <h2>Would You Rather</h2>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexDirection: 'row' }}>
      <Card sx={{ flex: 1, margin: '0 5px', padding: '30px', position: 'relative', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', 
          border: (hasAnswered && optionAnswer==="optionOne") ?  '6px solid #63b2ac' : 'none'}} >
        {hasAnswered ? <Typography variant="subtitle2" gutterBottom data-testid="OptionOneInfo">{optionOnePercentage}% | {optionOne.votes.length} OUT OF {totalVotes} VOTES</Typography> : <></>}
        <div sx={{ width: '100%', padding: '15px', textAlign: 'center'}}>
          <h3>{optionOne.text}</h3>
        </div>
        <Button variant="contained" sx={{ backgroundColor: '#63b2ac', width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0  }} 
        disabled={hasAnswered} value='optionOne' onClick={(e) => handleAnswer(e, question.id)}>Click</Button>
      </Card>
      <Card sx={{ flex: 1, margin: '0 5px', padding: '30px', position: 'relative', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          border: (hasAnswered && optionAnswer==="optionTwo") ?  '6px solid #63b2ac' : 'none' }}>
        {hasAnswered ?  <Typography variant="subtitle2" gutterBottom data-testid="OptionTwoInfo">{optionTwoPercentage}% | {optionTwo.votes.length} OUT OF {totalVotes} VOTES</Typography> : <></>}
        <div sx={{ width: '100%', padding: '15px', textAlign: 'center'}}>
          <h3>{optionTwo.text}</h3>
        </div>
        <Button variant="contained" sx={{ backgroundColor: '#63b2ac', width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0 }}
        disabled={hasAnswered} value='optionTwo' onClick={(e) => handleAnswer(e, question.id)}>Click</Button>
      </Card>
    </Box>
  </Container>

  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  
  const { id } = props.router.params;
  const question = questions[id];
  const author = question ? users[question.author] : null;
  const hasAnswered = authedUser ? Object.keys(users[authedUser].answers).includes(id) : false;
  const optionAnswer = users[authedUser].answers[id] ? users[authedUser].answers[id] : null;

  return {
    authedUser,
    question,
    author,
    hasAnswered, 
    optionAnswer,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));

<Card sx={{border: '6px solid #63b2ac'}} >

</Card>