import React, { Component } from "react";
import "../App.css";
import axios from 'axios'
import Search from "./Search.js";
import Table from "./Table.js";
import {
  PARAM_PAGE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PATH_BASE,PARAM_HPP,DEFAULT_HPP
} from "./URLconstants";
import Button from "./Button";
import {Loading} from './Loading'

class Main extends Component {
  _isMounted = false;
  state = {
    result: null,
    searchKey:"",
    searchTerm: "",
    error:null,
    isLoading:false,
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({isLoading:true})
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({error}));
  };

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({searchKey:searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }
componentWillUnmount() {
  this.setState({isLoading:true})
  this._isMounted = false;
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
    const { searchTerm, result,searchKey,error,isLoading } = this.state;
    const page = (result && result[searchKey] && result[searchKey].page) || 0;
    const list = (result && result[searchKey] && result[searchKey].hits) || [];
    
    return (
      <div className="page">
        <div className="interactions">
        {!result && <div>SEARCH BY TITLE</div>}
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          {!isLoading ? <Loading/>:<Button
            onClick={() => this.fetchSearchTopStories(searchKey, page - 1)}
            disabled={(result && result.page <=0) || (result && result.page === '') ? true : false}
          >
            Previous
          </Button>}
          {<Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            disabled={searchTerm === "" ? true : false}
          >
            More
          </Button>}
        </div>

        {error ? (<div className = "nodata"><p>Something went wrong.</p></div>):( <Table list={list} onDismiss={this.onDismiss} />)}
      </div>
    );
  }
}

export default Main;
