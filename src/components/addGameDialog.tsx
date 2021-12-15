import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ToggleButton from '@mui/material/ToggleButton';

const AddGameDialog = ({ open, onClose }) => {
    const [deckList, setDeckList] = useState([]);
    const [winner, setWinner] = useState(null)
    const [losers, setLosers] = useState([])
    const [winMethod, setWinMethod] = useState('')
    const [first, setFirst] = useState(false);
    const [turnOneSolRing, setTurnOneSolRing] = useState(false);

    // Get players
    useEffect(() => {
        fetch('/.netlify/functions/decks')
            .then(res => res.json())
            .then(res => setDeckList(res))
            .catch(err => console.log(err))
    }, [])

    const closeDialog = () => {
        // TODO: Improve this as state updates won't be batched due to being called from async
        setWinner(null);
        setLosers([]);
        setWinMethod('');
        setFirst(false);
        setTurnOneSolRing(false);
        onClose()
    }

    const onSubmit = () => {
        fetch('/.netlify/functions/games-create', {
            body: JSON.stringify({
                winner: winner.id,
                losers: losers.map(loser => loser.id),
                winMethod,
                first,
                turnOneSolRing,
            }),
            method: 'POST'
        })
        .then(res => res.json())
        .then(() => closeDialog())
        .catch(err => console.log(err))
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}>
            <DialogTitle>Add Game</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ marginTop: 1 }}>
                    <Grid item xs={8}>
                        <Autocomplete
                            id="winner"
                            onChange={(e, value) => setWinner(value)}
                            options={deckList}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Winner" />
                            )} />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Win Method</InputLabel>
                            <Select
                                label="win-method"
                                value={winMethod}
                                onChange={e => setWinMethod(e.target.value)}>
                                <MenuItem
                                    value="COMBAT">
                                    Combat
                                </MenuItem>
                                <MenuItem
                                    value="COMBO">
                                    Combo
                                </MenuItem>
                                <MenuItem
                                    value="CONCEDE">
                                    Concede
                                </MenuItem>
                                <MenuItem
                                    value="OTHER">
                                    Other
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="losers"
                            onChange={(e, value) => setLosers(value)}
                            options={deckList}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Losers" />
                            )} />
                    </Grid>
                    <Grid item>
                        <ToggleButton
                            value="check"
                            selected={first}
                            onChange={() => setFirst(!first)}>
                            FIRST
                        </ToggleButton>
                    </Grid>
                    <Grid item>
                        <ToggleButton
                            value="check"
                            selected={turnOneSolRing}
                            onChange={() => setTurnOneSolRing(!turnOneSolRing)}>
                            SOL RING
                        </ToggleButton>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddGameDialog;
