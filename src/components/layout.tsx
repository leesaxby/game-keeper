import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import CasinoIcon from '@mui/icons-material/Casino';
import { navigate } from "gatsby"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const drawerWidth = 240;

const Layout = ({ children }) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: 9999 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Game Keeper
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <List>
                    <ListItem button onClick={() => navigate('/results')}>
                        <ListItemIcon>
                            <CasinoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Results" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/players')}>
                        <ListItemIcon>
                            <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Players" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/decks')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Decks" />
                    </ListItem>
                </List>
            </Drawer>
            <Toolbar />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                    p: 3
                }} >
                {children}
            </Box>
        </Box>
    )
}

export default Layout;
