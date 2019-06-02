import React, { Component } from "react";
import "../App.css";
import Search from './Search.js';
import Table from './Table.js'
import {DEFAULT_QUERY,PATH_SEARCH,PARAM_SEARCH,PATH_BASE} from './URLconstants'

class Main extends Component {
  state = {
    result:null,
    searchTerm: DEFAULT_QUERY
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };
  
  setSearchTopStories =(result)=>{
    this.setState({result});
  }

  
  componentDidMount(){
    const { searchTerm } = this.state
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  onDismiss = id => {
    const {result} =this.state
    const updatedList = result.hits.filter(item => item.objectID !== id);
    this.setState({
      result:{...result, hits: updatedList }
     });
  };

  render() {
    const {searchTerm,result } = this.state;
    return (
      <div className="page">
        <Search 
           value={searchTerm}
            onChange={this.onSearchChange}
        >
        Search
        </Search>
        
        {result && <Table 
        list = { result.hits}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
        />}
      </div>
    );
  }
}

export default Main;
