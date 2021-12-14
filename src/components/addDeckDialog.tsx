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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import placeholderImg from '../images/placeholder.jpeg';

const AddDeckDialog = ({ open, onClose }) => {
    const [playerList, setPlayerList] = useState([]);
    const [commanderList, setCommanderList] = useState([''])
    const [commanderSearchTerm, setCommanderSearchTerm] = useState('');

    const [commander, setCommander] = useState('')
    const [player, setPlayer] = useState('');
    const [level, setLevel] = useState('');
    const [deckName, setDeckName] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    // Get players
    useEffect(() => {
        fetch('/.netlify/functions/players')
            .then(res => res.json())
            .then(res => setPlayerList(res))
            .catch(err => console.log(err))
    }, [])

    // Get list of commanders on search
    useEffect(() => {
        if(commanderSearchTerm) {
            fetch(encodeURI(`https://api.scryfall.com/cards/autocomplete?q=${commanderSearchTerm}`))
                .then(res => res.json())
                .then(res =>  setCommanderList(res.data))
                .catch(err => console.log(err))
        }
    }, [commanderSearchTerm])


    // When commander is selected from the list, fetch card image from api
    const onSelectCommander = (e, value) => {
        fetch(encodeURI(`https://api.scryfall.com/cards/named?exact=${value}`))
            .then(res => res.json())
            .then(res => setImgUrl(res.image_uris.art_crop))
            .catch(err => console.log(err))

        setCommander(value);
    };

    const onSubmit = () => {
        fetch('/.netlify/functions/decks-create', {
            body: JSON.stringify({
                commander,
                player: player.ref['@ref'].id,
                level,
                name: deckName,
                imageURL: imgUrl,
            }),
            method: 'POST'
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        onClose();
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}>
            <DialogTitle>Add Deck</DialogTitle>
            <DialogContent sx={{ padding: 0 }}>
                <Card sx={{ width: '100%', borderRadius: 0 }}>
                    <CardMedia
                        component="img"
                        height="240"
                        src={imgUrl || placeholderImg}
                        alt="Commander"
                    />
                    <CardContent>
                        <Grid
                            container
                            spacing={3} sx={{ marginTop: 1 }}>
                            <Grid item xs={8}>
                                <Autocomplete
                                    id="commander"
                                    onChange={onSelectCommander}
                                    inputValue={commanderSearchTerm}
                                    onInputChange={(e, value) => setCommanderSearchTerm(value)}
                                    options={commanderList}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Commander" />
                                    )} />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Player</InputLabel>
                                    <Select
                                        label="player"
                                        value={player}
                                        onChange={e => setPlayer(e.target.value)}>
                                        {
                                            playerList.map(player => {
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="deck-name"
                                    label="Deck Name"
                                    value={deckName}
                                    onChange={e => setDeckName(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    fullWidth
                                    exclusive
                                    value={level}
                                    size="large"
                                    onChange={(e, value) => setLevel(value)}>
                                    {
                                        ['1','2','3','4','5','6','7','9','10']
                                            .map(x => <ToggleButton key={x} value={x}>{x}</ToggleButton>)
                                    }
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>


            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDeckDialog;
