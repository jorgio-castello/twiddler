$(document).ready(function(){
  streams.home.forEach(tweet => generateTweet(tweet));
  displayUsers();

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

let activeUser; //This global variable will keep track if a button has been clicked

function showTweets(user, tweet) {
  //Declare jQuery selector and assign it the tweetContainerDiv
  //Declare string to hold value for CSS activeButtonClass, which will be toggled when button is pressed
  //Declare jQuery selector assigned to user parameter's button
  //Declare jQuery selector assigned to #activeTwiddlerTitle
  //Declare isTweetBool and assign it the bool of whether tweet is defined
  //Declare usernamesArr and assign it the usernames present streams.users object

  //if active user is undefined, there are 2 conditional handlers
    //1. if a tweet is present, showTweets() was invoked by a new tweet being generated, generate the tweet to HOME
    //2. if a tweet isn't present, showTweets() was invoked by a button press, run the following:
      //2a. Empty the tweet container
      //2b. Re-assign activeUser to user parameter
      //2c. Loop through activeUser's tweets and push to DOM
      //2d. Change pageTitle to activeUser
      //2e. Add userButtonActive CSS class to userButton

    //else: active user is defined, there are 3 conditional handlers
      //1. if a tweet is present, and the tweet was made by the active user, generate the tweet to user page
      //2. if a tweet isn't present, showTweets() was invoked by a button press, run the following:
        //2a. if the button that was clicked is already active (it has been clicked before):
        //2a. REASONING: this means the user wants to return to HOME, they clicked on user previously, they click on user
              //again so that they can remove focus
          //2a1. Empty the tweet container
          //2a2. Re-assign active user to undefined
          //2a3. Remove activeButton CSS class from userButton
          //2a4. Loop through HOME's tweets and push to DOM
          //2a5. Change pageTitle to HOME
        //2b. if the user button was clicked and it isn't already active (it hasn't been clicked before):
        //2b. REASONING: this could happen in two scenarios, (1) no buttons are currently active (HOME -> User), (2) another button is already active (USER -> USER)
          //2b1. Empty the tweet container
          //2b2. Remove activeButtonClass from current activeUser
          //2b3. Re-assign activeUser to user parameter
          //2b4. Loop through activeUser's tweets and push to DOM
          //2b5. Change pageTitle to activeUser
          //2b6. Add userButtonActive CSS class to userButton
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
    let $userTweets = $(`<span class = "supplementaryElementTweets">${streams.users[user].length} tweets</span>`);

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
}