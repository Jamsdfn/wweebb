import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from './Drawer'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:'#02B4D1'}}>
                <Toolbar>
                    <Drawer/>
                    <Typography variant="h6" className={classes.title}>
                        Title
                    </Typography>
                    <IconButton color="inherit">
                        <ExpandMoreIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
