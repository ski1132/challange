import React ,{Component} from 'react';
import axios from 'axios'
import { Button,Container, Row, Col,Jumbotron,Table,NavLink } from 'reactstrap';
import {  Redirect } from 'react-router-dom';
import Header from './Header.js'
export default class Home extends Component{
    state = {
        balance:0,
        checkFirst:true,
        dataTran:{},
        dates:""

    }
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log("date = "+date);
        
        this.showBalance();
      }
    showBalance=async () => {
        console.log(localStorage.getItem('id_owner'));
        const http = await axios.post('http://localhost:5000/checkBalance',
        {
            id : localStorage.getItem('id_owner')
        })
        const http1 = await axios.post('http://localhost:5000/getHis',{})
        this.setState({dataTran:http1.data});
        console.log(http.data[0]);
        if(http.data[0] ){
            this.setState({balance:http.data[0].balance});
            localStorage.setItem('account_id', http.data[0]._id);
        }
        localStorage.setItem('balance', this.state.balance);
        this.setState({checkFirst:false});
        return <Redirect to='/home' />;
    }
    checkBalance = () =>{
        if(this.state.checkFirst)
            //this.showBalance();
        console.log("balance = "+localStorage.getItem('balance'))
        if(localStorage.getItem('balance') !== "0")
            return <NavLink href="/transfer"> <Button size="20" color="primary" > transfer </Button>{' '} </NavLink>;
        else
            return <Button size="20" color="secondary" > Can't transfer </Button> ;
    }
    showHis = () =>{
        var dataHis=[];
        dataHis.push(
            <thead>
                                <tr>
                                    <th>ID Transaction</th>
                                    <th> Owner</th>
                                    <th> Amount </th>
                                    <th> Date </th>
                                    <th> Comment </th>
                                </tr>
                            </thead>
    )
        for(var i=0;i<this.state.dataTran.length;i++)
        {
            dataHis.push( <tbody>
                    <tr>
                        <th scope="row" key={this.state.dataTran[i]._id.toString()}> {this.state.dataTran[i]._id} </th>
                        <td key={this.state.dataTran[i].id_transfer}> {this.state.dataTran[i].id_transfer} </td>
                        <td> {this.state.dataTran[i].amount} </td>
                        <td> {this.state.dataTran[i].date} </td>
                        <td> {this.state.dataTran[i].comment} </td>
                    </tr></tbody>
            )
            
        }

        return ( dataHis );
            
    }
    render(){
        return(
            <div>
                <Header/>
            <Container>
                <Jumbotron>
                <Row>
                    <Col xs="2" ></Col>
                    <Col xs="9" align="left"> <h2>Your Account ID is  &nbsp; {localStorage.getItem('account_id')}</h2></Col>
                </Row>
                <Row>
                    <Col xs="3" ></Col>
                    <Col xs="7" align="left"> <h2>Your Balance is  &nbsp; {this.state.balance}</h2></Col>
                </Row>
                <Row>
                    <Col xs="12" align="center"> &nbsp; </Col>
                </Row>
                <Row>
                    <Col xs="5" align="center"> &nbsp; </Col>
                    <Col xs="2" align="center"> 
                        {this.checkBalance()}
                    </Col>
                </Row>
                <Row>
                    <Col> <font size="30" color="red"> History </font> </Col>
                </Row>
                <Row>
                    <Col xs="12" align="center"> &nbsp; </Col>
                </Row>
                <Row>
                    <Col xs="1" > &nbsp; </Col>
                    <Col xs="10" >
                    <Table align="center" className="Table" striped bordered hover size="sm" responsive="sm">
                                {this.showHis()}
                        </Table>
                    </Col>
                </Row>
                </Jumbotron>
            </Container>
            </div>
        )
    }
}