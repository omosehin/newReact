import React, { Component } from "react";
import "../App.css";
import Search from "./Search.js";
import Table from "./Table.js";
import {
  PARAM_PAGE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PATH_BASE,PARAM_HPP,DEFAULT_HPP
} from "./URLconstants";
import Button from "./Button";

class Main extends Component {
  state = {
    result: null,
    searchTerm: "",
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits:[]
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result:{ hits:updatedHits,page} 
    });

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
    const page = (result && result.page) || 0;
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
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page - 1)}
            disabled={(result && result.page <=0) || (result && result.page === '') ? true : false}
          >
            Previous
          </Button>
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
            disabled={searchTerm === "" ? true : false}
          >
            More
          </Button>
        </div>

        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        {!result && <div className="nodata">SEARCH BY TITLE</div>}
      </div>
    );
  }
}

export default Main;
