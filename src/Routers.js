import React ,{ Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logins from './web/Login';
import Historys from './web/History';
import Registers from './web/Register';
import Homes from './web/home';
import Transfers from './web/Transfer';

export default class Routers extends Component{
    render(){
        return(
            <Router>
                <Route exact path="/" component={Logins} /> 
                <Route exact path="/home" component={Homes} /> 
                <Route exact path="/history" component={Historys} />
                <Route exact path="/Register" component={Registers} /> 
                <Route exact path="/transfer" component={Transfers} /> 
            </Router>
        )
    }
}