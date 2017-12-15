class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      'currentVideo': window.exampleVideoData[0],
      'videoList': window.exampleVideoData,
      'statistics': {}
    };
    this.searchYouTubeCallback = this.searchYouTubeCallback.bind(this);
  }
  
  componentDidMount() {
    searchYouTube = _.debounce(searchYouTube, 500);
    searchYouTube('Hack Reactor', this.searchYouTubeCallback);
    var videos = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      
      //https://www.googleapis.com/youtube/v3/search?key=AIzaSyC7sAs-AEskPhK4O552uRNb9atmbMW_EQs&q=%QUERY&maxResults=5&part=snippet&type=video&videoEmbeddable=true
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        wildcard: '%QUERY',
        url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC7sAs-AEskPhK4O552uRNb9atmbMW_EQs&q=%QUERY&maxResults=5&part=snippet&type=video&videoEmbeddable=true',
        transform: function(response) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(response.items, function(video) {
            console.log(video.snippet.title);
            return {
              value: video.snippet.title.slice(5);
            };
          });
        }
      }
    });

    // Instantiate the Typeahead UI
    $('.typeahead').typeahead(null, {
      display: 'value',
      source: videos,
      minLength: 4
    });
  }

  playSelectedVideo(videoId, channelId, event, videoKey) {
    let clickIndex = videoKey.slice(-1);
    this.getStats(videoId, channelId);
    this.setState({
      'currentVideo': this.state.videoList[clickIndex]
    });
  }

  searchYouTubeCallback(returnData) {
    this.setState({'videoList': returnData.items, 'currentVideo': returnData.items[0]});
    this.getStats(returnData.items[0].id.videoId, returnData.items[0].snippet.channelId);
  }

  getStats(videoId, channelId) {
    $.get('https:www.googleapis.com/youtube/v3/videos', {
      'key': window.YOUTUBE_API_KEY,
      'part': 'statistics',
      'id': videoId
    }, returnData => {
      var videoStats = returnData.items[0].statistics;
      var videoObj = {'viewCount': videoStats.viewCount, 'likes': videoStats.likeCount, 'dislikes': videoStats.dislikeCount};
      searchYouTubeChannel(channelId, videoObj, this.setState.bind(this));
      
    }); 
  }

  render() {
    return (  
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div>
              <Search searchFn={this.searchYouTubeCallback}/>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div>
              <VideoPlayer statistics={this.state.statistics} video={this.state.currentVideo}/>
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
