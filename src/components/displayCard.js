import React from 'react';
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {blue, green, red, grey} from "@mui/material/colors";
import SmileIcon from "@mui/icons-material/Mood";
import ListItemText from "@mui/material/ListItemText";
import SadIcon from "@mui/icons-material/MoodBad";
import WinRate from "@mui/icons-material/TrendingDown";
import { CardActions, CardHeader, CardMedia } from "@mui/material";

const DisplayCard = ({ commander, imageURL, name, level, player }) => {
    const levelTitle = ` (${level})`
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: grey[500] }} aria-label="Display Card" />
                }
                title={`${name}${level ? levelTitle : ''}`}
                subheader={player}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageURL}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <List
                    dense
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 0,
                        marginTop: 1,
                        marginBottom: 1,
                    }}>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: green[500] }}>
                                <SmileIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={5}
                        />

                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[500] }}>
                                <SadIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={5}
                        />
                    </ListItem>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[500] }}>
                                <WinRate />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="45%"
                        />
                    </ListItem>
                </List>
            </CardActions>
        </Card>
    )
}

export default DisplayCard;
