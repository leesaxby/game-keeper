import * as React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import DisplayCard from '../components/displayCard';
import AddDeckDialog from '../components/addDeckDialog';
import { Deck } from "../typings/typeShared";

const Decks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [addDeckOpen, setAddDeckOpen] = useState(false);

    const onAddDeckClose = () => {
        setAddDeckOpen(false);
        getDecks();
    };

    const onAddDeckOpen = () => {
        setAddDeckOpen(true);
    };

    const getDecks = () => {
        fetch('/.netlify/functions/decks')
        .then(res => res.json())
        .then(res => setDecks(res))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        // Not listed in dependencies
        getDecks();
    }, []);

    return (
        <>
            <Layout
                title="Decks"
                actions={(
                    <Button
                        variant="outlined"
                        onClick={onAddDeckOpen}>ADD DECK</Button>
                )}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}>
                        {
                            decks.map(({ id, name, player, commander, level, imageURL }) => {
                                return (
                                    <Grid
                                        item
                                        key={id}>
                                        <DisplayCard
                                            id={id}
                                            name={name}
                                            commander={commander}
                                            level={level}
                                            player={player.data.name}
                                            imageURL={imageURL}/>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Layout>
                <AddDeckDialog
                    open={addDeckOpen}
                    onClose={onAddDeckClose} />
        </>
    );
};

export default Decks;
