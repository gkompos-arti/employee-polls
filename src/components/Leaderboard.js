
import { connect } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '& .user-details': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .user-avatar': {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: "8px",
    borderRadius: "50%",
    width: "64px",
    height: "64px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  height: "100px",
}));

const TableWrapper = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "200px",
});



const Leaderboard = (props) => {
    const { users } = props;
  return (
    <TableWrapper>
        <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell data-testid="users-column">Users</StyledTableCell>
                <StyledTableCell align="right" data-testid="answer-column">Answered</StyledTableCell>
                <StyledTableCell align="right" data-testid="created-column">Created</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
                Object.keys(users).map((item, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell>
                          <div className="user-details">
                            <img className="user-avatar" src={users[item].avatarURL} alt={users[item].name} />
                            <div>
                              <div>{users[item].name}</div>
                              <div>{users[item].id}</div>
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="right">{Object.keys(users[item].answers).length}</StyledTableCell>
                        <StyledTableCell align="right">{ users[item].questions.length }</StyledTableCell>
                    </StyledTableRow>
                ))
            }
            </TableBody>
          </Table>
        </TableContainer>
    </TableWrapper>
  );
};

const mapStateToProps = ({ users }) => {
    const sortedUsers = Object.values(users).sort((a, b) => {
      const aTotal = Object.keys(a.answers).length + a.questions.length;
      const bTotal = Object.keys(b.answers).length + b.questions.length;
      return bTotal - aTotal;
    });
  
    return {
      users: sortedUsers,
    };
  };
  
export default connect(mapStateToProps)(Leaderboard);