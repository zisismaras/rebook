# Rebook

#### An easy way for teams to share and read content.

##### Running locally
First install the dependenicies
```javascript
npm install
```
Then edit `/server/datasources.json` with your mysql database information.  
Run
```javascript
node .
```

##### Technologies used
The backend runs on nodejs with help from the [loopback](http://loopback.io/) framework.  
For the frontend [Vue.js](http://vuejs.org/) was used together with [Materialize](http://materializecss.com/) for the css.  
Another cool thing is the sprinkle of some [SSE](https://en.wikipedia.org/wiki/Server-sent_events) for realtime notifications of new bookmarks.


##### Licensed under the GPLv2
