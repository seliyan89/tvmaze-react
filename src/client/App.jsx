
import React from 'react';
import {hot} from 'react-hot-loader';
import {results} from './results';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';
import styles from './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStatus:false,
      searchResults: ""
    };
    this.updateSearchAndResultStatus = this.updateSearchAndResultStatus.bind(this);
  }

  updateSearchAndResultStatus (searchStatus,resultsStatus) {
    this.setState({ searchStatus: searchStatus, searchResults: resultsStatus }); 
  }

  updateResults (val){
    this.setState({results:val} , () => {
      console.log("hi");
    });
  }

  render() {

    let searchStatusElement = null;
    if (this.state.searchStatus==false) {
      searchStatusElement = <Form updateSearchAndResultStatus = {this.updateSearchAndResultStatus} />
    }else {
      searchStatusElement = <SearchAgain updateSearchAndResultStatus = {this.updateSearchAndResultStatus} />
    }
    let displayResultsElement = null;
    if (this.state.searchResults != "") {
      displayResultsElement = <DisplayResults searchResults = {this.state.searchResults} />
    }

    return (
      <div>
      <p className={styles.intro}>TVMaze React</p>
      {searchStatusElement}
      {displayResultsElement}
      </div>
      );
  }
}

class SearchAgain extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.updateSearchAndResultStatus(false,"");
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit}>
        <input className={styles.searchAgainBox} type="submit" value="Search Again" />
      </form>
      )
  }

}


class Form extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.updateSearchAndResultStatus(true,results);
  }

  render(){ 

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <input className={styles.searchBox} placeholder="Enter Search" />
      <input className={styles.submitSearch} type="submit" value="Submit" />
      </form>
      </div>
      )
  }
}

class DisplayResults extends React.Component {
  constructor(){
    super();
  }

  render(){
    let resultItem = this.props.searchResults.map((resultItem,index)=>{
      return (
        <img key={index} src={resultItem.show.image.medium} />
        );
    })

    return (
      <div>
      {resultItem}
      </div>
      );
  }
}


export default hot(module)(App);
