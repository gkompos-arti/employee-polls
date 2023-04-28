import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from '../actions/questions'; 
import { useNavigate } from "react-router-dom";
import { Button, Container, FormControl, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";
import "./NewQuestion.css";

const NewQuestion = ({dispatch, authedUser}) => {
    const navigate = useNavigate();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(optionOne, optionTwo))
        
        setOptionOne("");
        setOptionTwo("");
        if(!authedUser){
            navigate('/dashboard');
        }
    };
    
    return(
    <div className="create-poll-container">
      <Container maxWidth="sm">
        <Typography variant="h3" className="create-poll-title" marginBottom={"16px"}>
          Would You Rather
        </Typography>
        <Typography variant="h4" className="create-poll-subtitle" marginBottom={"32px"}>
          Create Your Own Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="optionone">Option One</InputLabel>
                <OutlinedInput
                  label="Option One"
                  id="optionone"
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value)}
                  labelwidth={70}
                  className="create-poll-input"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="optiontwo" label="Option Two">Option Two</InputLabel>
                <OutlinedInput
                  label="Option Two"
                  id="optiontwo"
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                  labelwidth={70}
                  className="create-poll-input"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className="create-poll-button"
                type="submit"
                disabled={optionOne === "" || optionTwo === ""}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
    )
};

export default connect()(NewQuestion);

