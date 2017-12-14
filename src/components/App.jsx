class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      'currentVideo': window.exampleVideoData[0],
      'videoList': window.exampleVideoData
    };
  }

  playSelectedVideo(event, videoId) {
    let clickIndex = videoId.slice(-1);
    
    this.setState({
      'currentVideo': window.exampleVideoData[clickIndex]
    });
    // console.log(videoId.slice(-1));
  }

  render() {
    return (  
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view should go here</h5></div>
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
