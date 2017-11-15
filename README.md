# reddit-reader
reddit-reader is a tool that helps managing subreddits on reddit.

Reddit is a website composed of communities called subreddits. Each subreddit has posts that users can upvote and downvote. Examples: https://www.reddit.com/r/news/, https://www.reddit.com/r/todayilearned/

Reddit can be hard to navigate, especially for users who frequently browse a specific set of subreddits. Thus, this streamlined reddit reader can help user add or delete subreddits of their choice, and the posts from those subreddits are also able to display.

To clone this to local device:

::

   git clone https://github.com/JingzheSun/reddit-reader.git

Simply open the index.html under root folder to test.

================
Version History
================

``V1.0.0`` 2017/11/15 (latest)

* Using react as front-end framework.
* Allows user to manage their own subreddits:
 
  * Adding subreddits
  * Deleting subreddits
  * Current version doesn't support memorizing users' preference without back-end authentication. 
  * Posts can show up appropriately
  * Allows searching funciton while selecting subreddit

* Using Reddit's API