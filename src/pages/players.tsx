import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Layout from '../components/layout';
import DisplayCard from '../components/displayCard';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('/.netlify/functions/players')
            .then(res => res.json())
            .then(res => setPlayers(res))
            .catch(err => console.log(err))

    }, [])

    return (
        <Layout title="Players">
             <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}>
                    {
                        players.map(({ id, name, imageURL }) => {
                            return (
                                <Grid
                                    item
                                    key={id}>
                                    <DisplayCard
                                        name={name}
                                        imageURL={imageURL} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
        </Layout>
    )
}



export default Players;
