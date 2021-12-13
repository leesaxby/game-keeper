import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const AddDeckDialog = ({ open, onClose }) => {
    const [players, setPlayers] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState('');


    const onSelectPlayer = (e) => {
        setSelectedPlayer(e.target.value)
    }

    useEffect(() => {
        fetch('/.netlify/functions/players')
            .then(res => res.json())
            .then(res => setPlayers(res))
            .catch(err => console.log(err))
    }, [])

    console.log(players)

    return (
        <Dialog
            fullWidth
            open={open}>
            <DialogTitle>Add Deck</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Player</InputLabel>
                            <Select
                                autoFocus
                                autoWidth
                                label="player"
                                value={selectedPlayer}
                                onChange={onSelectPlayer}>
                                {
                                    players.map(player => {
                                        return (
                                            <MenuItem
                                                key={player.ref['@ref'].id}
                                                value={player}>
                                                { player.data.name }
                                            </MenuItem>

                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="name"
                            label="Name"
                            fullWidth/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="commander"
                            label="Commander"
                            type="email"
                            fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="level"
                            label="Level"
                            type="number"
                            fullWidth/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button onClick={() => {}}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDeckDialog;
