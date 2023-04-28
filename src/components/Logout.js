import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Logout({ dispatch }) {
    let navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setAuthedUser(null));
        navigate('/');
    };

    return (
        <LogoutIcon style={{ marginLeft: '10px' }} onClick={handleLogout} data-testid="logout-link"/>
    );
}

export default connect()(Logout);