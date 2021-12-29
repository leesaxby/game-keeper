import * as React from 'react'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../components/layout';
import Button from "@mui/material/Button";
import AddGameDialog from '../components/addGameDialog'

const Games = () => {
    const [games, setGames] = useState([]);
    const [addGameOpen, setAddGameOpen] = useState(false);

    const getGames = () => {
        fetch('/.netlify/functions/games')
            .then(res => res.json())
            .then(res => setGames(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // Not listed in dependencies
        getGames()
    }, [])

    const onAddGameClose = () => {
        setAddGameOpen(false);
        getGames();
    };

    return (
        <>
            <Layout
                title="Games"
                actions={(
                    <Button
                        variant="outlined"
                        onClick={() => setAddGameOpen(true)}>ADD GAME</Button>
                )}>
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
                </Layout>
            <AddGameDialog
                open={addGameOpen}
                onClose={onAddGameClose} />
        </>
    )
}

export default Games;
