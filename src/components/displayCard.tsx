import * as React from 'react';
import { useEffect,  useState } from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {blue, green, red} from "@mui/material/colors";
import SmileIcon from "@mui/icons-material/Mood";
import ListItemText from "@mui/material/ListItemText";
import SadIcon from "@mui/icons-material/MoodBad";
import WinRate from "@mui/icons-material/TrendingDown";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Game } from "../typings/typeShared";

type Props = {
    id: string,
    imageURL: string,
    name: string,
    commander?: string,
    level?: number,
    player?: string,
}

const getWinRate = (wins: number, losses: number) => Math.round(wins / (wins + losses) * 100);

const countLosses = (games: Game[], deckId: string) => games
        .map(({ losers }) => losers)
        .flat()
        .filter(loser => loser.id === deckId)
        .length;

const DisplayCard = ({ id, commander, imageURL, name, level, player }: Props) => {
    const [winCount, setWinCount] = useState(0);
    const [lossCount, setLossCount] = useState(0);
    const [winRate, setWinRate] = useState(0);
    const levelTitle = ` (${level})`;

    useEffect(() => {
        if (commander) {
            fetch(`/.netlify/functions/deck-wins?deckId=${id}`, )
                .then(res => res.json())
                .then(res => setWinCount(res.length))
                .catch(err => console.log(err));

            // TODO: Create a new function to just pull back the losses instead of pulling all games.
            fetch('/.netlify/functions/games')
                .then(res => res.json())
                .then(res => setLossCount(countLosses(res, id)))
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (winCount + lossCount > 0) {
            setWinRate(getWinRate(winCount, lossCount));
        }
    }, [winCount, lossCount]);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image={imageURL}
                alt="Commander"
            />
            <CardContent>
                <Typography component="div" variant="h6">
                    {name}
                </Typography>
                {
                    commander && (
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {`${commander}${level ? levelTitle : ''}`}
                        </Typography>
                    )
                }
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    {player}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                <List
                    dense
                    sx={{
                        display: 'flex',
                        padding: 0,
                        marginBottom: 1,
                    }}>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: green[500] }}>
                                <SmileIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={winCount}
                        />

                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[500] }}>
                                <SadIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={lossCount}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[500] }}>
                                <WinRate />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${winRate}%`}
                        />
                    </ListItem>
                </List>
            </CardActions>
        </Card>
    );
};

export default DisplayCard;
