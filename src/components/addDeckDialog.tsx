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

const AddDeckDialog = ({ open, onClose }) => {
    const [players, setPlayers] = useState([]);
    const [commanderSearchTerm, setCommanderSearchTerm] = useState('');
    const [selectedCommander, setSelectedCommander] = useState('')
    const [commanderList, setCommanderList] = useState([''])
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const onSelectCommander = (e, value) => {
        setSelectedCommander(value)
    }

    const onSelectPlayer = (e) => {
        setSelectedPlayer(e.target.value)
    }

    const onCommanderSearch = (e, value) => {
        setCommanderSearchTerm(value)
    }


    useEffect(() => {
        fetch('/.netlify/functions/players')
            .then(res => res.json())
            .then(res => setPlayers(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if(commanderSearchTerm) {
            const url = `https://api.scryfall.com/cards/autocomplete?q=${commanderSearchTerm}`

            fetch(encodeURI(url))
            .then(res => res.json())
            .then(res => {
                setCommanderList(res.data)
            })
            .catch(err => console.log(err))
        }
    }, [commanderSearchTerm])

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}>
            <DialogTitle>Add Deck</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            fullWidth/>
                    </Grid>
                    <Grid item xs={4}>
                            <FormControl fullWidth>
                            <InputLabel>Player</InputLabel>
                            <Select
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
                    <Grid item xs={6}>
                    <Autocomplete
                        id="commander"
                        onChange={onSelectCommander}
                        inputValue={commanderSearchTerm}
                        onInputChange={onCommanderSearch}
                        options={commanderList}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Commander" />
                        )} />
                    </Grid>
                    <Grid item xs={2}>
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
                <Button onClick={() => {}}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDeckDialog;
