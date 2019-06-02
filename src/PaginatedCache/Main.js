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
    searchKey:"",
    searchTerm: "",
    error:null,
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({error}));
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey:searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const {searchKey,results} =this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits:[];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result:{ 
        ...results,
        [searchKey] :{hits:updatedHits,page} }
    });

  };

  needsToSearchTopStories =(searchTerm)=>{
    return !this.state.result[searchTerm]
  }
  onSearchSubmit = e => {
    const { searchTerm } = this.state;
    this.setState({searchKey:searchTerm});
    if(this.needsToSearchTopStories){
    this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  };

  onDismiss = id => {
    const {searchKey, result } = this.state;
    const {hits,page } = result[searchKey];
    const updatedHits = hits.filter(item => item.objectID !== id);
    this.setState({
      result: { 
          ...result, 
          [searchKey] :{hits:updatedHits,page}
        }
    });
  };

  render() {
    const { searchTerm, result,searchKey,error } = this.state;
    const page = (result && result[searchKey] && result[searchKey].page) || 0;
    const list = (result && result[searchKey] && result[searchKey].hits) || [];
    if(error){
      return <p>Somethng went wrong.</p>;
    }
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
            onClick={() => this.fetchSearchTopStories(searchKey, page - 1)}
            disabled={(result && result.page <=0) || (result && result.page === '') ? true : false}
          >
            Previous
          </Button>
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            disabled={searchTerm === "" ? true : false}
          >
            More
          </Button>
        </div>

        {error && <div className = "nodata"><p>Something went wrong.</p></div>}
        {!error && <Table list={list} onDismiss={this.onDismiss} />}
        {!result && <div className="nodata">SEARCH BY TITLE</div>}
      </div>
    );
  }
}

export default Main;
