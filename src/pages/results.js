import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../components/layout';

const Results = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/.netlify/functions/games')
            .then(res => res.json())
            .then(res => setGames(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Layout
                main={(
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Winner</TableCell>
                                    <TableCell>Method</TableCell>
                                    <TableCell>Went First</TableCell>
                                    <TableCell>Turn One Sol Ring</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {games.map(({ id, winner, winMethod, first, turnOneSolRing }) => (
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{winner.data.name}</TableCell>
                                        <TableCell>{winMethod}</TableCell>
                                        <TableCell>{first ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{turnOneSolRing ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )} />
        </>
    )
}

export default Results;
