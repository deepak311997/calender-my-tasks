import React from 'react';
import PropTypes from 'prop-types';

import HeaderComponent from './header/header-component';
import SidebarComponent from './sidebar/sidebar-component';
import CalenderComponent from './calender/calender-component';

import Grid from '@material-ui/core/Grid';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'; 

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#813588',
    },
  },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <SidebarComponent/>
            <Grid container={true}>
                <Grid className='app-header' item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <HeaderComponent/>
                </Grid>
                <Grid className='app-calender' item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CalenderComponent/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

App.defaultProps = {

};

App.propTypes = {

}