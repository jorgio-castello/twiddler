$(document).ready(function(){
  displayUsers();
  streams.home.forEach(tweet => generateTweet(tweet));

  $('.supplementaryElement button').click(e => {
    let user = e.currentTarget.getAttribute('id');
    showTweets(user);
  });

  $('#newTweetListener').click(e => {
    let tweet = e.tweet;
    let user = e.tweet.user;
    showTweets(user, tweet);
  });
});

let activeUser;
function showTweets(user, tweet) {
  let activeClass = 'userButtonActive';
  let userBtnSelector = $(`#${user}`);
  let isTweetBool = tweet !== undefined;

  if(!activeUser) { //Handle cases when activeUser is undefined
    if(isTweetBool) generateTweet(tweet); //push tweet to 'Home'
    else {
      activeUser = user;
      showTweetsHandler(activeUser); //Show tweets for activeUser
    }
  } else { //Handle cases where activeUser is defined
    if(isTweetBool) {
      if(user === activeUser) generateTweet(tweet); //if activeUser tweets, push it to their timeline
      updateUserButtonNumberOfTweets(user);
    }
    else {
      if(userBtnSelector.hasClass(activeClass)) { //if the user clicks on username when it is already active
        userBtnSelector.removeClass(activeClass);
        activeUser = undefined;
        showTweetsHandler(activeUser); //Show tweets for Home
      } else {
        $(`#${activeUser}`).removeClass(activeClass);
        activeUser = user;
        showTweetsHandler(activeUser); //Show tweets for new activeUser
      }
    }
  }
}

//HELPER FUNCIONS -----------------------------

//generateTimeStamp accepts a date
//generateTimeStamp return a string to include in a new tweet
function generateTimeStamp(date) {
  //0. List of full month names to use in a new tweet
  let months = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'];

  //1. Declare current day, month, & year based on date parameter
  let day = date.getDate(), year = date.getFullYear(), month = months[date.getMonth()];

  //2a. Declare hours / minutes / amPM of tweet
  //2b. hours / amPM will be re-assigned based on whether it is AM or PM at time of tweet
  let hours = date.getHours(), minutes = date.getMinutes(), amPM = 'AM';
  minutes = String(minutes).padStart(2, '0'); //if minutes is less than 10, add a 0 in front

  //2c.Re-assign hours / amPM based on the following:
  //if hours = 0, hours should equal 12, and amPM should equal AM
  //else if hours > 12, hours should equal hours less 12, and time should be PM
  if(hours === 12) amPM = 'PM';
  if(hours > 12) hours -= 12, amPM = 'PM';
  if(hours === 0) hours = 12;

  //3. Declare and return formatted timeStamp – ex: Twiddled at 8:07PM on February 20, 2020
  return ` Twiddled at ${hours}:${minutes} ${amPM} on ${month} ${day}, ${year}`
}

//displayUsers accepts nothing
//displayUsers pushes a formatted unordered list to the DOM with each user element as an LI
//Each LI includes a button, that when clicked will display the selected user's timeline
//displayUsers returns nothing
function displayUsers() {
  let $userUL = $(`<div class = "supplementaryList"></div>`);

  for(let user in streams.users) {
    let $userLI = $(`<li class = "supplementaryElement"></li>`);

    let $user = $(`<span class = "supplementaryElementID">@${user}</span>`);
    let $userTweets = $(`<span class = "supplementaryElementTweets"><span id = "${user}Tweets">0&nbsp</span>tweets</span>`);

    let $button = $(`<button class = "userButton" id = "${user}"></button>`);

    $user.appendTo($button);
    $userTweets.appendTo($button);
    $button.appendTo($userLI);
    $userLI.appendTo($userUL);
  }

  $userUL.appendTo('#activeUserInfo .userInfo');
}

//generateTweet accepts a tweet from streams.home
//generateTweet pushes the tweet to the DOM
//generateTweet doesn't return anything
function generateTweet(tweet) {
  //Declare the inputs of a tweet: user, message, and timeStamp
  let $user = $(`<button class = "tweetElementUser">@${tweet.user}</button>`);
  let $message = $(`<div class = "tweetElementMessage">${tweet.message}</div>`);
  let $timeStamp = $(`<div class = "tweetElementTimestamp">${generateTimeStamp(tweet.created_at)}</div>`);

  //Declare $tweet div
  let $tweet = $('<div class = "tweetElement"></div>');

  //Append tweet elements to $tweet
  $user.appendTo($tweet);
  $message.appendTo($tweet);
  $timeStamp.appendTo($tweet);

  //Append $tweet to tweetContainer
  $tweet.prependTo($('.tweetContainer'));

  //Update # of user tweets in button
  updateUserButtonNumberOfTweets(tweet.user);
}

//showTweetsHandler receives an activeUser parameter: activeUser may be a username, or it may be undefined
//showTweetHandles does the following
  //1. Updates the DOM for an activeUser's tweets (if activeUser is defined)
  //2. Updates the DOM for Home's tweet (if activeUser is undefined)
function showTweetsHandler(activeUser) {
  let tweetContainer = $('.tweetContainer');
  let activeClass = 'userButtonActive';
  let userBtnSelector = $(`#${activeUser}`);
  let twiddlerTitle = $('#activeTwiddlerTitle');

  tweetContainer.empty();

  //Generate user / HOME tweets depending on whether there is an active user
  (activeUser ? streams.users[activeUser] : streams.home).forEach(tweet => generateTweet(tweet));

  //Generate twiddler title depending on whether there is an activeUser
  twiddlerTitle.text((activeUser ? `@${activeUser}` : 'Home'));

  //Add active class to button if there is an activeUser
  if(activeUser) userBtnSelector.addClass(activeClass);
}

//Receives a username
//Push updated tweet # to the DOM
function updateUserButtonNumberOfTweets(user) {
  $(`#${user}Tweets`).text(`${streams.users[user].length}${String.fromCharCode(160)}`);
}