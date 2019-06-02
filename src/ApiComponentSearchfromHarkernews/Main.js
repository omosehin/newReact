import React, { Component } from "react";
import "../App.css";
import Search from "./Search.js";
import Table from "./Table.js";
import {
  DEFAULT_QUERY,
  PATH_SEARCH,
  PARAM_SEARCH,
  PATH_BASE
} from "./URLconstants";

class Main extends Component {
  state = {
    result: null,
    searchTerm: ""
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  fetchSearchTopStories = searchTerm => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  onSearchSubmit = e => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  };

  onDismiss = id => {
    const { result } = this.state;
    const updatedList = result.hits.filter(item => item.objectID !== id);
    this.setState({
      result: { ...result, hits: updatedList }
    });
  };

  render() {
    const { searchTerm, result } = this.state;
    if(result === '') return 'No data'
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}}
        />}
      </div>
    );
  }
}

export default Main;
