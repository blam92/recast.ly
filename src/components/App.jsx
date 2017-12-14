class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      'currentVideo': window.exampleVideoData[0],
      'videoList': window.exampleVideoData
    };
  }

  componentDidMount() {
    this.searchYouTube();
    this.searchYouTube = _.debounce(this.searchYouTube, 500);
  }

  playSelectedVideo(event, videoId) {
    let clickIndex = videoId.slice(-1);
    
    this.setState({
      'currentVideo': this.state.videoList[clickIndex]
    });
    
  }

  searchYouTube(query = 'Hack Reactor') {
    $.get('https://www.googleapis.com/youtube/v3/search', {
      'key': window.YOUTUBE_API_KEY,
      'q': query,
      'maxResults': 5,
      'part': 'snippet',
      'type': 'video',
      'videoEmbeddable': true
    }, returnData => {
      this.setState({'videoList': returnData.items, 'currentVideo': returnData.items[0]});
    });
  }


  render() {
    return (  
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div>
              <Search searchFn={this.searchYouTube.bind(this)}/>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div>
              <VideoPlayer video={this.state.currentVideo}/>
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <VideoList videos={this.state.videoList} selectVideoFn={this.playSelectedVideo.bind(this)}/>
            </div>
          </div>
        </div>
      </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
