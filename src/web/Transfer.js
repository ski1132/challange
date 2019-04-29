import React ,{Component} from 'react';
import axios from 'axios'
import { Button,Container ,FormGroup, Row, Col,Jumbotron,Input } from 'reactstrap';
import {  Link,Redirect } from 'react-router-dom';
import Header from './Header.js'
export default class Home extends Component{
    state = {
        id:String,
        amount:0,
        checkRe:false,
        comment:""
    }
      insertHis =async () => {
        console.log(localStorage.getItem('balance'));
        console.log("amount = "+this.state.amount);
        if( parseInt(this.state.amount,10) <= parseInt(localStorage.getItem('balance'), 10) ){
            var today = new Date(),
            Dates = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + 'h:' + today.getMinutes() + 'm:' + today.getSeconds() + 's';
            console.log("date = "+ Dates);
            await axios.post('http://localhost:5000/makeTrans',
            {
                id_owner : localStorage.getItem('account_id'),
                id_transfer:this.state.id,
                amount:this.state.amount,
                comment:this.state.comment,
                balance : localStorage.getItem('balance'),
                date:Dates
            })
            console.log("check");
            alert('Transfer complete');
            this.setState({checkRe:true})
            
        }
        else{
            return alert('Your balance not enought to transfer');
        }
    }
    checkRe = () =>
    {
        if(this.state.checkRe)
            return <Redirect to='/home' />;
    }
    render(){
        return(
            <div>
                <Header/>
                { this.checkRe()}
            <Container>
                <Jumbotron>
                <Row>
                    <Col xs="3" ></Col>
                    <Col xs="8" align="left"> <h2>Your Balance is  &nbsp; {localStorage.getItem('balance')}</h2></Col>
                </Row>
                <Row>
                    <Col xs="2" ></Col>
                    <Col xs="5" align="left"> <h2> Enter account ID to transfer </h2></Col> &nbsp; 
                    <Col xs="3" align="left">    <Input type="text" name="account_id" onChange={(e) => this.setState({id:e.target.value})} placeholder="" bsSize="large" size="5"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" ></Col>
                    <Col xs="5" align="right"> <h2> Enter amount  </h2></Col> &nbsp; 
                    <Col xs="3" align="left">    <Input type="text" name="amount" onChange={(e) => this.setState({amount:e.target.value})} placeholder="" bsSize="large" size="5"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" ></Col>
                    <Col xs="5" align="right"> <h2> Comment to Remember </h2></Col> &nbsp; 
                    <Col xs="3" align="left">    <Input type="text" name="comment" onChange={(e) => this.setState({comment:e.target.value})} placeholder="" bsSize="large" size="5"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" align="center"> &nbsp; </Col>
                </Row>
                <Row>
                    <Col xs="12" align="center"> 
                        <FormGroup >
                            <Button type="submit" color="primary" onClick={(e)=>this.insertHis()} > Confirm Transfer </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/home" ><Button color="secondary"> Back to History  </Button>{' '} </Link>  
                        </FormGroup>
                        {/* <NavLink href="/transfer"> <Button size="20" color="primary" > Confirm transfer </Button>{' '} </NavLink> 
                        <NavLink href="/home"> <Button size="20" color="secondary" > Back to history </Button>{' '} </NavLink> */}
                    </Col>
                </Row>
                
               
                </Jumbotron>
            </Container>
            </div>
        )
    }
}