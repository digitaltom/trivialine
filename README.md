trivialine
==========

web-based realtime multiplayer quiz game

Running on: 
http://trivialine.herokuapp.com/


== Run locally

`sudo bundle install`
`sudo rcredis start`
`rake db:setup # setting up the database and adding some initial questions`
`rails s`


== Deploy

`heroku git:remote -a trivialine # only needed once`
`git push heroku master`

Logs: 
`heroku logs -t`

Console: 
`heroku run rails console`
