var VideoDetails = (props) => (
  <div className="video-statistics">
    <div className="view-count">{Number(props.statistics.viewCount).toLocaleString('en')} views</div>
    <div className="like-dislike">
      <span id="thumbup"> {props.statistics.likes} <img src="imgs/thumbs-up.png"/></span>
      <span id="thumbdown"> {props.statistics.dislikes} <img src="imgs/thumbs-down.png"/> </span></div>
  </div>
);