import React, { Component } from 'react';
// import logo from './logo.svg';
import Header from './components/header.js'
import Footer from './components/footer.js'
import MainContent from './components/MainContent.js'
import {Grid} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentNav:'create'
    }
    this.handleTabSelect = this.handleTabSelect.bind(this)

  }
  today(){
    return new Date().toLocaleDateString();
  }
  handleTabSelect(e){
    console.log('Im now at the top of the app and ready to tell maincontent which nav is selected')
    console.log(e)
    this.setState({currentNav:e})
  }
  render() {
    return (
      <Grid>
       <Header
         handleTabSelect={this.handleTabSelect}
         name="Where you going today"
         date={this.today()}
       />
       <MainContent 
        currentNav={this.state.currentNav}
       />
       <Footer />
       </Grid>
    );
  }
}

// function App(props){
//   let today = new Date().toLocaleDateString();
//   return(
//     <div>
//      <Header
//        name="Where you going today"
//        date={today}
//      />
//      <MainContent />
//      <Footer />
//    </div>
//   )

// }

export default App;
