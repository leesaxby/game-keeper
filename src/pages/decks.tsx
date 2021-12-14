import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import DisplayCard from '../components/displayCard';
import AddDeckDialog from '../components/addDeckDialog';


const Decks = () => {
    const [decks, setDecks] = useState([]);
    const [addDeckOpen, setAddDeckOpen] = useState(false);

    const onAddDeckClose = () => {
        setAddDeckOpen(false);
    };

    const onAddDeckOpen = () => {
        setAddDeckOpen(true);
    };

    useEffect(() => {
        fetch('/.netlify/functions/decks')
            .then(res => res.json())
            .then(res => setDecks(res))
            .catch(err => console.log(err))

    }, [])

    return (
        <>
            <Layout
                actions={(
                    <Button
                        variant="outlined"
                        onClick={onAddDeckOpen}>ADD DECK</Button>
                )}
                main={(
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}>
                        {
                            decks.map(({ id, name, player, commander, imageURL }) => {
                                return (
                                    <Grid
                                        item
                                        key={id}>
                                        <DisplayCard
                                            name={name}
                                            commander={commander}
                                            player={player.data.name}
                                            imageURL={imageURL}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )} />
                <AddDeckDialog
                    open={addDeckOpen}
                    onClose={onAddDeckClose} />
        </>
    )
}

export default Decks;
