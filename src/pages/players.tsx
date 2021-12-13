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
        <Layout
            main={(
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}>
                    {
                        players.map(({ ref, data: { name, commander, imageURL }}) => {
                            return (
                                <Grid
                                    item
                                    key={ref['@ref'].id}>
                                    <DisplayCard
                                        name={name}
                                        commander={commander}
                                        imageURL={imageURL} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )} />
    )
}



export default Players;
