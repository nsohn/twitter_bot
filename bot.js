var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

/* Get Animoto followers
  params = account to find followers for

*/
function respondToTag(arrFollowers){
  var params = {
    q: '#noam_sohn_test since:2018-6-10',
    count: 2
  }
  T.get('search/tweets', params, gotData);
   function gotData(err, data, response) {
    // console.log(data.statuses)
    const userID = data.statuses[0].user.id;
    const screenName = data.statuses[0].user.screen_name;
    console.log("user id ", userID, "arrayOfFollowers length ", arrFollowers.length)
    const result = arrFollowers.filter(id => {
      return id == userID;
    });
    var tweet = {
      status: ''
    }
    if (result.length){
      tweet.status = `@${screenName} thanks for following us`
      }else{
      tweet.status= `@${screenName} you should follow us`
    }
    console.log(tweet.status)
    T.post('statuses/update', tweet, tweetWorked);
  };
}
/*
gotFollows gets creates an array of
a given users followers and then
calls respondToTag with the array
*/
function gotFollowers(err, data, response){
  const arrayOfFollowers = data.ids;
  console.log(data.ids.length);
  respondToTag(arrayOfFollowers);

}
T.get('followers/ids', {screen_name: 'noam_sohn'}, gotFollowers);

/*
tweetWorked is called from T.post
it logs whether the tweet successfully posted
*/
function tweetWorked(err, data, response){
  if (err){
    console.log('error');
  }else{
    console.log('it worked');
  }
}
