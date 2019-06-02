import React, { Component } from "react";
import "../App.css";
import Search from "./Search.js";
import Table from "./Table.js";
import {
  PARAM_PAGE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PATH_BASE
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
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    console.log(result)
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
    const page = (result && result.page) || 0;
    console.log(result&&result.page)
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
