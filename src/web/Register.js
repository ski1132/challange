import React ,{Component} from 'react';
import axios from 'axios'
import {  Link,Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input,Collapse, CardBody, Card } from 'reactstrap';
//import styled from 'styled-components';
import '../App.css';
export default class Register extends Component{

    state = {
        name:"",
        lname:"",
        mname:"",
        home_phone:"",
        phone:"",
        email:"",
        address:"",
        accept:"", //if accept the value = "on" 
        account_type:"",
        pass:"",
        confirmPass:"x",
        purpose:"",
        about_us:"",
        checkRe:false,
        checkFault:""
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    
    checkRegister = async () => {
        

        /*if( !this.state.name  && !this.state.lname  && !this.state.phone
        && !this.state.email  && !this.state.pass) 
            this.setState({checkFault:this.state.checkFault+"Please input every primary form <br>"});

        else{
            if(this.state.pass !== this.state.confirmPass && this.state.pass) 
                this.setState({checkFault:this.state.checkFault+"Your Password is not same <br>"});

            if(!this.state.accept)
                this.setState({checkFault:this.state.checkFault+"Please Accept term and rule  <br>"});
        }
        if(this.state.checkFault !== "")
            this.showFault();
        */
        if(this.state.pass === this.state.confirmPass && this.state.pass )
        {
            if( this.state.name  && this.state.lname  && 
            this.state.phone  && this.state.email  && this.state.pass && this.state.accept)
            {
                const http1 = await axios.post('http://localhost:5000/checkMail', 
                {
                    email : this.state.email,
                    pass : this.state.pass
                })
                console.log(http1.data[0]);
                if(!http1.data[0])  
                {
                    await axios.post('http://localhost:5000/register', 
                    {
                        name : this.state.name,
                        lname : this.state.lname,
                        mname : this.state.mname,
                        home_phone : this.state.home_phone,
                        phone : this.state.phone,
                        email : this.state.email,
                        address : this.state.address,
                        pass : this.state.pass,
                        purpose : this.state.purpose,
                        about_us : this.state.about_us,
                        account_type: this.state.account_type
                    })
                    this.setState({checkRe:true});
                    return alert("Success !! please login")
                }
                else
                    return alert("This E-mail has already use !!!");
            }
            else if(!this.state.accept )
            {
                return alert("please Accept term and rule !!!")
            }
            else
            {
                return alert("please input every primary form")
            }
        }
        else
        {
            return alert(" Your Password is not same")
        }
    }
    cheackRedirect= () =>{
        if(this.state.checkRe === true)
            return <Redirect to='/' />;
    }
    showFault= () =>{
        return <div className="showFaults" > {this.state.checkFault} </div>
    }
    /*cheackForm= () =>{
        if(this.state.name === "" && this.state.lname === "" && 
        this.state.phone === "" && this.state.email === "" && this.state.pass === "")
            return " disabled ";
    }*/

    render(){
        return(
                <div>
                   <Form align="left"><br/>
                        <div className="header"> Create Your account</div>
                        <FormGroup>
                            <Label > <h5>Name </h5></Label>
                            <Input type="text" name="name" onChange={(e) => this.setState({name:e.target.value})} placeholder="" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> Surname </h5></Label>
                            <Input type="text" name="lname" onChange={(e) => this.setState({lname:e.target.value})} placeholder="" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> Midname </h5></Label>
                            <Input type="text" name="mname" onChange={(e) => this.setState({mname:e.target.value})} placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> Home phone </h5></Label>
                            <Input type="text" name="home_phone" onChange={(e) => this.setState({home_phone:e.target.value})} placeholder="Stick to it  Ex.0123456789" />
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> Phone </h5></Label>
                            <Input type="text" name="phone" onChange={(e) => this.setState({phone:e.target.value})} placeholder="Stick to it  Ex.0123456789" required/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleEmail"> <h5> Email </h5></Label>
                        <Input type="email" name="email" onChange={(e) => this.setState({email:e.target.value})} placeholder="with a placeholder" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> Address </h5></Label>
                            <Input type="textarea" name="address" onChange={(e) => this.setState({address:e.target.value})} placeholder="" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword"> <h5> Password </h5></Label>
                            <Input type="password" autoComplete="off" name="pass" onChange={(e) => this.setState({pass:e.target.value})} placeholder=""  required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword"> <h5> Confirm Password </h5></Label>
                            <Input type="password" autoComplete="off" name="confirmPass" onChange={(e) => this.setState({confirmPass:e.target.value})} placeholder="" required/>
                        </FormGroup> 
                        <FormGroup>
                            <Label> <h5> Purpose of bank account </h5></Label>
                            <Input type="text" name="purpose" onChange={(e) => this.setState({purpose:e.target.value})} placeholder="" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label > <h5> How did you hear about us </h5></Label>
                            <Input type="textarea" name="about_us" onChange={(e) => this.setState({about_us:e.target.value})} placeholder="" required/>
                        </FormGroup>
                        <FormGroup check>
                            <Label ><h5> Choose the Account Type  </h5> </Label> <br/>
                            <Input type="radio" name="radioType" onChange={(e) => this.setState({account_type:'saving'})} checked/>{'Saving'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input type="radio" name="radioType" onChange={(e) => this.setState({account_type:'deposit'})} />{'Deposit'}<br/><br/>
                        </FormGroup>
                        <FormGroup check>
                            <Label> <h5> accept term and rule !!!  </h5> </Label> <br/>
                            <Input type="radio" name="radioAccept" onChange={(e) => this.setState({accept:e.target.value})} />{' '}
                                I have accept term and rule &nbsp;&nbsp;&nbsp;
                                <Button color="primary" onClick={this.toggle} > Toggle term </Button>
                                <Collapse isOpen={this.state.collapse}>
                                <Card>
                                    <CardBody>
                                        มีกฎอะไรก็เขียนบอกไปปป <br/>
                                        1. ทางธนาคารถูกทุกอย่าง  <br/>
                                        2. หากคิดว่าธนาคารผิด กลับไปดูข้อ 1.
                                    </CardBody>
                                </Card>
                                </Collapse>
                            
                        </FormGroup>
                        <br/>
                        <FormGroup check>
                            <Button type="submit" color="primary" onClick={(e)=>this.checkRegister()} > Submit </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/" ><Button color="secondary"> Back to Login  </Button>{' '} </Link>  
                        </FormGroup>
                    </Form>
                    {/* {this.checkForm()} */}
                    {this.cheackRedirect()}
                </div>
        )
    }
}