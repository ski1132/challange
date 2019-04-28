import React, { Component } from 'react';
import './App.css';
import { Container} from 'reactstrap';
import Routers from './Routers';
class App extends Component 
{
  async componentDidMount() 
  { 
    //เหมือน constuctor function
    //const testData = await axios.get("http://localhost:5000")
    //console.log(testData.data[0])
    
  }
  render() 
  {
    return (
        <Container align="center">
          <Routers />
        </Container>
    );
  }
}

export default App;
