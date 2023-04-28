import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Button, Divider } from '@mui/material';
import "./Question.css";

function Question(props) {
  const { question, author, timestamp } = props;

  let navigate = useNavigate();

  return (
    <Card className="question-card" variant="outlined">
      <CardContent>
        <div className="author-info">
          <p className="author-title">{author.id}</p>
          <p className="author-date">{new Date(timestamp).toLocaleString()}</p>
        </div>
        <Divider className="divider" variant="middle" />
        <div className="question-info">
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => navigate(`/questions/${question.id}`)}
            className="button"
            style={{ marginTop: '1rem' }}
          >
            View Poll
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const author = users[question.author];

  return {
    question,
    author,
    timestamp: question.timestamp,
  };
}

export default connect(mapStateToProps)(Question);