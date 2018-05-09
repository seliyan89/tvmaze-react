import React from 'react';
import {hot} from 'react-hot-loader';
import {results} from './results';
import {queryTVMazeAPI} from './Util';

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

  render() {
    console.log("searchStatus",this.state.searchStatus);
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.updateSearchAndResultStatus(false,"");
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <input className={styles.searchAgainBox} type="submit" value="Search Again" />
      </form>
      )
  }

}


class Form extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchInput : ""
    }
  }

  async handleSubmit(event){
    event.preventDefault();
    let searchValue = await queryTVMazeAPI(this.state.searchInput);
    this.props.updateSearchAndResultStatus(true,searchValue);
  }

  handleChange(event){
    event.preventDefault();
    this.setState({searchInput:event.target.value});
  }

  render(){ 

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <input onChange={this.handleChange} className={styles.searchBox} placeholder="Enter Search" value={this.state.searchInput} />
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
