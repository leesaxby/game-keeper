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
import CssBaseline from '@mui/material/CssBaseline';
import { navigate } from "gatsby"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Grid from "@mui/material/Grid";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Divider from '@mui/material/Divider';


const drawerWidth = 200;

const theme = createTheme({
    palette: {
        background: {
          default: "#f5f6f7"
        }
      }
});

const Layout = ({ children, actions = null, title = '' }) => (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="transparent"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    boxShadow: 'none'
                }}
                >
                <Toolbar>
                    <Typography
                        noWrap
                        variant="h6"
                        component="div"
                        sx={{ color: '#34495e'}}>
                        {title}
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
                        background: '#34495e',
                        color: '#ffffff',
                    },
                }}
                variant="permanent"
                anchor="left">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Game Keeper
                    </Typography>
                </Toolbar>
                <Divider
                    sx={{ background: '#577a9d' }}
                    variant="middle" />
                <List>
                    <ListItem button onClick={() => navigate('/players')}>
                        <ListItemIcon>
                            <PersonOutlineIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Players" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/decks')}>
                        <ListItemIcon>
                            <InboxIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Decks" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/games')}>
                        <ListItemIcon>
                            <CasinoIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'transparent',
                    p: 3 }}>
                <Toolbar />
                <Grid
                    container
                    justifyContent="flex-end"
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    sx={{ width: '100%' }}>
                    <Grid item>
                        {actions}
                    </Grid>
                </Grid>
                <Box
                    component="main"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        flexGrow: 1,
                        p: 3
                    }}>
                    {children}
                </Box>
            </Box>
        </Box>
    </ThemeProvider>    

);

export default Layout;
