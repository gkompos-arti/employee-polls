import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import "./Nav.css";


const Nav = (props) => {
    
    const { authedUser, linkAvatar } = props;
    const location = useLocation();



    
    return (
        <AppBar position="static">
            <Toolbar>
                <div className="navContainer">
                    <div className="navLinks">
                        <Link to="/dashboard" className={`navLink ${location.pathname === '/dashboard' ? 'active' : ''}`} data-testid="home-link">Home</Link>
                        <Link to="/leaderboard" className={`navLink ${location.pathname === '/leaderboard' ? 'active' : ''}`} data-testid="leaderboard-link">Leaderboard</Link>
                        <Link to="/add" className={`navLink ${location.pathname === '/add' ? 'active' : ''}`} data-testid="add-link">New Question</Link>
                    </div>
                    

                </div>
                <div className="navProfile">
                    {
                        linkAvatar!==undefined ? <Avatar src={linkAvatar} alt={authedUser} className="navAvatar" /> : <></>
                    }
                        <Typography variant="h6" component="div" className="navTitle" data-testid="user-information">{authedUser}</Typography>
                        <Logout/>
                    </div>


            </Toolbar>
        </AppBar>

    )
}

const mapStateToProps = ({authedUser, users}) => {
    return {
        authedUser,
        linkAvatar: users[authedUser]?.avatarURL,
    }
}

export default connect(mapStateToProps)(Nav);
