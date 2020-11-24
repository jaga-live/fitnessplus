export const updateTitle = (count) => {
  var title = " - Fitness Plus";
  if (window.location.href.endsWith("activity")) {
    title = "Activity" + title;
  } else if (window.location.href.endsWith("challanges")) {
    title = "Challenges" + title;
  } else if (window.location.href.endsWith("friends")) {
    title = "Friends" + title;
  } else if (window.location.href.endsWith("leaderboard")) {
    title = "Leaderboard" + title;
  } else if (window.location.href.endsWith("notification")) {
    title = "Notification" + title;
  } else if (window.location.href.endsWith("mobile")) {
    title = "Mobile" + title;
  } else if (window.location.href.endsWith("profile")) {
    title = "Profile" + title;
  } else {
    title = "Fitness Plus";
  }
  document.title = (count ? (count > 0 ? `(${count}) ` : "") : "") + title;
};
