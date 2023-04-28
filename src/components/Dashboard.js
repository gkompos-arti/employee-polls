import React, { useEffect } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = (props) => {
  const { answeredQuestions, unansweredQuestions } = props;

  return (
<div className="dashboard" style={{ paddingTop: "50px" }}>
  <Grid container spacing={2} sx={{ mb: 4 }} style={{ paddingTop: "50px" }} maxWidth={1000} >
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center' }} fontWeight={'bold'} data-testid="dashboard-heading">
            New Questions
          </Typography>
          <Grid container spacing={2}>
            {unansweredQuestions.map((id) => (
              <Grid item xs={12} sm={6} key={id}>
                <Question id={id} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} style={{ paddingTop: "50px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center' }} fontWeight={'bold'}>
            Done
          </Typography>
          <Grid container spacing={2}>
            {answeredQuestions.map((id) => (
              <Grid item xs={12} sm={6} key={id}>
                <Question id={id} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</div>


  );
};
function mapStateToProps ({ authedUser, questions, users }){
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unansweredQuestions = Object.keys(questions)
    .filter((id) => !answeredQuestions.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
  };
};

export default connect(mapStateToProps)(Dashboard);

