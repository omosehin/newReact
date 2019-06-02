function isSearched(searchTerm){
    return function(item){
      return item.title.toLwerCase().includes(searchTerm.toLowerCase())
    }
  }