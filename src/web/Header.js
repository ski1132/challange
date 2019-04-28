import React, { Component } from 'react';

import { Container,Nav,Navbar,NavbarBrand,NavItem,NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';
class App extends Component 
{
  async componentDidMount() 
  { 
    //เหมือน constuctor function
    //const testData = await axios.get("http://localhost:5000")
    //console.log(testData.data[0])
    
  }
  checkLogin1= () =>{
    if(localStorage.getItem('userName') )
     {
        return (
        <NavItem>
          <NavLink> {localStorage.getItem('userName')}</NavLink> 
        </NavItem>);

     }
     
  }
  checkLogin2= () =>{
    if(localStorage.getItem('userName') !== "")
     {
        return (
        <NavItem>
          <NavLink href="/"> Logout </NavLink>
        </NavItem>);

     }
     
  }
  render() 
  {
    return (
        <div>
            <Container align="center">
          <Navbar color="blue" light expand="md">
            <NavbarBrand > <h1>Bank</h1> </NavbarBrand>
            <Nav className="ml-auto" navbar>
                {this.checkLogin1()}
                {this.checkLogin2()}
            </Nav>
          </Navbar>
        </Container>
        </div>
    );
  }
}

export default App;
