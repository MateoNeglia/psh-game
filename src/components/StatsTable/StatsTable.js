import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import './StatsTable.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--hard-red)',
    color: 'var(--soft-cream)',
    fontWeight: '500',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatsTable = ({activeStats}) => {
    return (
        <>
            <TableContainer style={{backgroundColor: 'var(--soft-cream)'}} component={Paper} className='stats-table'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Player</StyledTableCell>
                        <StyledTableCell align="right">Score</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {activeStats?.map((stat) => (
                        <StyledTableRow key={stat.stat_id}>
                        <StyledTableCell component="th" scope="row" className="user-row">
                        <Avatar
                            alt={stat.nickname}
                            src={stat.profile_image}
                            sx={{ width: 25, height: 25 }}
                            />
                          {stat.nickname}</StyledTableCell>
                        <StyledTableCell align="right">{stat.score}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default StatsTable;