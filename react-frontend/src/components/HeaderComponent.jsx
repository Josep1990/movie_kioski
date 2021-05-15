import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";


class HeaderComponent extends Component { //this react component render the navbar on the broweser 
    render() {
        return (
            <div>
                <header>                     
                    <Navbar bg="dark" variant="dark">                        
                        <Nav className="mr-auto">
                            <Navbar.Brand href="/">Xtra-Vision</Navbar.Brand>  
                            <Nav.Link href="/"><Button variant="primary">Home</Button></Nav.Link>                      
                        </Nav>                        
                    </Navbar>        
                </header>
            </div>
        );
    }
}

export default HeaderComponent;