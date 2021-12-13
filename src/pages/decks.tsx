import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DisplayCard from '../components/displayCard';


const Decks = () => {
    const [decks, setDecks] = useState([]);
    const [createDeckOpen, setCreateDeckOpen] = useState(false);

    console.log(decks)
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
                        onClick={() => setCreateDeckOpen(true)}>ADD DECK</Button>
                )}
                main={(
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
                )} />
            <Dialog open={createDeckOpen}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDeckOpen(false)}>Cancel</Button>
                    <Button onClick={() => {}}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Decks;
