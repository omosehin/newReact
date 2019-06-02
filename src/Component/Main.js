import React, { Component } from "react";
import "../App.css";
import { List } from "./List";
import Search from './Search.js';
import Table from './Table.js'

class Main extends Component {
  state = {
    list: List,
    searchTerm: ""
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };
  
  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  };

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <Search 
           value={searchTerm}
            onChange={this.onSearchChange}
        >
        Search
        </Search>
        
        <Table 
        list = {list}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
        />
      </div>
    );
  }
}

export default Main;
