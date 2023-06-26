import React, { Component } from "react";
import logo from '../images/logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';


class Navbar extends Component {
    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: "#f1566d" }}>
                        <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Adopet
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            // <nav>
            //     <div class="nav-wrapper">
            //     <a href="/" class="brand-logo">
            //         <img alt="Logo Adopet" className="img-fluid w-50 h-50" src={logo} />
            //     </a>
            //     <ul id="nav-mobile" class="right hide-on-med-and-down">
            //         <li><a href="sass.html">Sass</a></li>
            //         <li><a href="badges.html">Components</a></li>
            //         <li><a href="collapsible.html">JavaScript</a></li>
            //     </ul>
            //     </div>
            // </nav>
            // <div className="navbar navbar-expand-md" style={{ backgroundColor: "#f1566d" }}>
            //     <div className="mx-auto p-3">
            //         <div className=" w-50 h-50">
                        
            //             {/* <span className="text-light">Adopet</span> */}
            //         </div>
            //     </div>
                
            // </div>
            
        );
    }
}

export default Navbar;