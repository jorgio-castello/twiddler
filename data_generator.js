/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.tags = {};
streams.users.douglascalhoun = [];
streams.users.mracus = [];
streams.users.sharksforcheap = [];
streams.users.shawndrost = [];
window.users = Object.keys(streams.users);

let tweetSchedulerBool = false;
let showNewTweetsBool = true;

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);

  if(newTweet.tag) {
    let tag = newTweet.tag;
    tag[0] = tag[0].slice(1);               //Remove the # from the first index of the tag array
    if(!streams.tags[tag[0]]) {             //If streams.tags does not have a property for the current tag
      streams.tags[tag[0]] = [];              //Create a property for that tag
    }
    streams.tags[tag[0]].push(newTweet);    //Push the newTweet into streams.tags at the property for that tag
  }
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.tag = findHashtag(tweet.message);
  tweet.created_at = new Date();
  tweet.globalIdx = streams.home.length;
  tweet.localIdx = streams.users[tweet.user].length;
  addTweet(tweet);

  if(tweetSchedulerBool) {
    //Create a click event to simulate on the #newTweetListener div and pass along the new tweet in the event object
    let e = jQuery.Event('click');          //1. Declare variable e that represents a 'click' event in jQuery
    e.tweet = tweet;                        //2. Add the newly generated tweet as a property to this event
    jQuery('#newTweetListener').trigger(e); //3. Trigger the click event on #newTweetListener
  }
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

tweetSchedulerBool = true;

// var scheduleNextTweet = function(){
//   if(showNewTweetsBool) generateRandomTweet();
//   setTimeout(scheduleNextTweet, Math.random() * 1500);
// };
// scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

function findHashtag(message) {
  let hashtagRegex = /#\w*[a-zA-Z]\w*/gm;
  return hashtagRegex.exec(message);
}