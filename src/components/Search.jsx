var Search = (props) => {
  
  let onSearch = (event) => {
    if (event.type === 'click' || event.type === 'keypress' && event.key === 'Enter') {
      // let query = document.getElementsByClassName('form-control')[0].value;
      
      let query = $('.tt-input').typeahead('val');
      console.log(query);
      searchYouTube(query, props.searchFn);
    }
  };
  
  return (<div className="search-bar form-inline">
    <input className="form-control typeahead" onKeyPress={onSearch} type="text" />
    <button onClick={onSearch} className="btn hidden-sm-down">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div>); 
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
