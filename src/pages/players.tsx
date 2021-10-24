import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SmileIcon from '@mui/icons-material/Mood';
import SadIcon from '@mui/icons-material/MoodBad';
import WinRate from '@mui/icons-material/TrendingDown';
import { green, pink, blue } from '@mui/material/colors';
import Layout from '../components/layout';
import { StaticImage } from "gatsby-plugin-image"

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('/.netlify/functions/players')
            .then(res => res.json())
            .then(res => setPlayers(res))
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
                    players.map(({ ref, data}) => {
                        return (
                            <Grid
                                item
                                key={ref['@ref'].id}>
                                <Card sx={{
                                    maxWidth: 345,
                                    minWidth: 300
                                }}>
                                    <StaticImage src="../images/person-placeholder.jpeg" alt="Player" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.name}
                                        </Typography>

                                        <List
                                            dense
                                            sx={{ marginTop: 2 }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: green[500] }}>
                                                        <SmileIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Wins"
                                                />
                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                    5
                                                </Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: pink[500] }}>
                                                        <SadIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Losses"
                                                />
                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                    5
                                                </Typography>
                                            </ListItem>
                                                <ListItem >
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: blue[500] }}>
                                                            <WinRate />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Win Rate"
                                                    />
                                                    <Typography variant="subtitle1" gutterBottom component="div">
                                                        45%
                                                    </Typography>
                                                </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Layout>
    )
}



export default Players;
