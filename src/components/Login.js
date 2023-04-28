import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleLogin } from "../actions/shared";
import { useNavigate } from "react-router-dom";
import loginIntro from '../photos/intro.png';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import "./App.css";

function Login(props) {
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    dispatch(handleLogin(selectedUser));
    navigate('/dashboard');
  };

  const { users } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ padding: "32px", maxWidth: "500px", width: "100%" }}>
        <Box sx={{ textAlign: "center" }}>
          <h1 data-testid="login-heading">Employee Polls</h1>
          <div className="login-image-container">
            <img src={loginIntro} alt="login intro" className="login-image"/>
          </div>
        </Box>
        <Box sx={{ textAlign: "center", mt: "32px" }}>
          <h1 data-testid="loginPage">Log In</h1>
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <label id="login-users" data-testid="username">User</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} label="User" labelid="login-users" data-testid="select-user">
              <option value="" disabled>
              Select User
              </option>
              {Object.keys(users).map((userId) => (
                <option key={userId} value={userId} data-testid="select-user-item">
                  {users[userId].name}
                </option>
              ))}
            </select>
            <Button  className="loginBtn" name="login" type="submit" disabled={selectedUser === ""} sx={{marginTop: "15px"}} 
            variant="outlined" color="secondary" onClick={(e) => {handleSubmit(e)}} data-testid="login">
              Login
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);