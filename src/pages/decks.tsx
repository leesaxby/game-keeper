import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import Grid from "@mui/material/Grid";
import DisplayCard from '../components/displayCard';


const Decks = () => {
    const [decks, setDecks] = useState([]);

    console.log(decks)
    useEffect(() => {
        fetch('/.netlify/functions/decks')
            .then(res => res.json())
            .then(res => setDecks(res))
            .catch(err => console.log(err))

    }, [])

    return (
        <Layout>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                {
                    decks.map(({ ref, data: { name, commander, imageURL }}) => {
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
        </Layout>
    )
}

export default Decks;
