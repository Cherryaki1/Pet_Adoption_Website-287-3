const express = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;

    if (visits === 0) {
        res.cookie('visits', 1);
        res.send('Welcome to my webpage! It is your first time here.');
    } else {
        visits++;
        res.cookie('visits', visits);

        // Get the last visit time from the cookie
        let lastVisitTime = req.cookies.lastVisitTime ?
            moment(req.cookies.lastVisitTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('America/New_York') :
            null;

        let message = `Hello, this is the ${visits} time that you are visiting my webpage.`;
        if (lastVisitTime) {
            message += `<br>Last time you visited my webpage on: ${lastVisitTime.format('ddd MMM DD HH:mm:ss')} EST`;
        }

        // Update the last visit time cookie
        res.cookie('lastVisitTime', moment().toISOString());

        res.send(message);
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});