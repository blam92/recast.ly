var searchYouTube = (query, callback) => {
  $.get('https://www.googleapis.com/youtube/v3/search', {
    'key': window.YOUTUBE_API_KEY,
    'q': query,
    'maxResults': 5,
    'part': 'snippet',
    'type': 'video',
    'videoEmbeddable': true,
  }, returnData => {
    callback(returnData);
  });
};

window.searchYouTube = searchYouTube;


var searchYouTubeChannel = (channelId, videoObj, callback) => {
  $.get('https:www.googleapis.com/youtube/v3/channels', {
    'key': window.YOUTUBE_API_KEY,
    'part': 'statistics, snippet',
    'id': channelId
  }, returnData => {
    let channelStats = returnData.items[0];
    let channelObj = {'channelName': channelStats.snippet.title, 'subscriberCount': channelStats.statistics.subscriberCount, 'channelDescription': channelStats.snippet.description, 'channelThumbnail': channelStats.snippet.thumbnails.default.url};
    let fullObj = _.extend(channelObj, videoObj);
    //channel get request
    callback({'statistics': fullObj});
  }); 
};