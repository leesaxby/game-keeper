import React from 'react';
import Container from '@mui/material/Container';
import Players from "./players/players";

const App = () => {
    return (
        <Container sx={{
            flexGrow: 1,
            zIndex: 1,
            display: 'flex',
            minHeight: '100%',
        }} maxWidth="xl">
            <Players/>
        </Container>
    )
}

export default App;
