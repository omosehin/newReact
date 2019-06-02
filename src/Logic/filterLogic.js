onDismiss = (id) =>{
    function isNotId(item){
      return item.objectID !==id
    }
    const updatedList = this.state.list.filter(isNotId)
  }

  