var ChannelDetails = (props) => (
  <div className="channel-statistics">
    <div className="ch-info-container">
      <div className="channel-thumbnail"><img src={props.statistics.channelThumbnail} /></div>
      <div className="channel-title">{props.statistics.channelName}</div>
    </div>
    <div className="sub-container">
      <div className="channel-subs">{props.statistics.subscriberCount} Subscribers</div>
    </div>
    <div className="channel-description">{props.statistics.channelDescription}</div>
  </div>
);