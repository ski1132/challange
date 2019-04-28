import React ,{ Component } from 'react';
import axios from 'axios'
import {  Link,Redirect } from 'react-router-dom';
import { Button,Container, Row, Col,Jumbotron } from 'reactstrap';
import Header from './Header.js'
export default class Login extends Component{
    state = {
        user:"",
        email:"",
        pass:"",
        checkRe:false,
        checkFirst:true,
        checkButton:false
    }
    
    checkLogin = async () => {
        const http = await axios.post('http://localhost:5000/', 
        {
          email: this.state.email,
          password: this.state.pass
        })
        
        //console.log(http.data[0].name);
        if(http.data[0] ){
            localStorage.setItem('name', http.data[0].name);
            localStorage.setItem('id_owner', http.data[0].id);
            //localStorage.getItem('userName'); || ''
            this.setState({checkRe:true});
        }
        if(this.state.checkFirst) 
        {
            // this.setState({checkButton:true});
            // this.setState({checkFirst:false});
        }
    }
    
    cheackRedirect= () =>{
        localStorage.setItem('userName', '');
        if(this.state.checkRe)
        {
            alert("Correct !!! ");
            localStorage.setItem('userName', localStorage.getItem('name'));
            console.log(localStorage.getItem('userName'));
            console.log(localStorage.getItem('id_owner'));
            return <Redirect to={{pathname:'/home'}} />
        }
        if(this.state.checkButton)
        {
            if(this.state.email === "" && this.state.pass === "")
                return " Please input email and password";

            else
                return " Wrong username or Password !!!  Try again";
                
        }
        
    }

    render(){
        return(
            <div>
            <Header/>
            <Container>
                <Jumbotron>
                <Row>
                    <Col xs="4" > </Col>
                    <Col xs="4" > { this.cheackRedirect() }  </Col>
                </Row>
                <Row>
                    <Col >---------------------------------------- </Col>
                </Row>
                <Row>
                    <Col xs="4" ></Col>
                    <Col xs="1" > E-mail  </Col>
                    <Col xs="1"><input type="email" name="mail" onChange={(e) => this.setState({email:e.target.value})} />  </Col>
                </Row>
                <Row>
                    <Col xs="4" ></Col>
                    <Col xs="1" > Password </Col>
                    <Col xs="1" > <form><input type="password" autoComplete="off" name="pass" onChange={(e) => this.setState({pass:e.target.value})} /></form> </Col>
                </Row>
                <Row>
                    <Col> ---------------------------------------- </Col>
                </Row>
                <Row>
                    <Col xs="6" ></Col>
                    <Col sm="12">
                        <Button color="primary" onClick={(e)=>this.checkLogin()}> Login </Button>{' '} &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/Register" ><Button color="secondary"> Register  </Button>{' '} </Link>  
                       
                    </Col>
                </Row>
                </Jumbotron>
            </Container>
                
            </div>
            
            
            
        )
    } // <Link to="/forgot_pass"> Forgot Password </Link>
}