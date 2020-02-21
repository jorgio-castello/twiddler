
//generateTweet accepts a tweet from streams.home
//generateTweet pushes the tweet to the DOM
//generateTweet doesn't return anything
function generateTweet(tweet) {
  //Declare the inputs of a tweet: user, message, and timeStamp
  let user = `@${tweet.user}`;
  let message = `: ${tweet.message}`;
  let timeStamp = new Date();

  let $tweet = $('<div></div>');
  $tweet.text(user + message + timeStamp);
  $tweet.appendTo($('body'));
}

$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var index = 0;
  var tweet = streams.home[index];
  generateTweet(tweet);


});