const express = require('express');
const app = express();
const path = require('path');

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
);

// Question 1

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'exercices.html'));
})
app.use(express.static(path.join(__dirname)));

function findSummation(N) {
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    sum += i;
  }
  return sum;
}

app.post('/findSummation', (req, res) => {
  const N = req.body.N;
  const result = findSummation(N);
  res.send(`Summation ${result}`);
});

function uppercaseFirstandLast(str) {
  let words = str.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.length > 1) {
      let capitalizedWord = word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
      result += capitalizedWord;
    } else {
      result += word.toUpperCase();
    }
    if (i < words.length - 1) {
      result += " ";
    }
  }
  return result;
}

app.post('/uppercaseFirstandLast', (req, res) => {
  const str = req.body.str;
  const result = uppercaseFirstandLast(str);
  res.send(`Result: ${result}`);
});

function findAverageAndMedian(numArray) {
  let arr = numArray.split(",");
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i]);
  }
  let average = sum / arr.length;
  arr.sort((a, b) => a - b);
  let median;
  if (arr.length % 2 === 0) {
    median = (parseInt(arr[arr.length / 2]) + parseInt(arr[arr.length / 2 - 1])) / 2;
  } else {
    median = arr[Math.floor(arr.length / 2)];
  }
  return { average, median };
}

app.post('/findAverageAndMedian', (req, res) => {
  const numbers = req.body.numArray;
  const result = findAverageAndMedian(numbers);
  res.send(`Average: ${result.average}, Median: ${result.median}`);
});

function find4Digits(numStr) {
  let numbers = [];
  let firstSplit = numStr.split(" ");
  for (let i = 0; i < firstSplit.length; i++) {
    let secondSplit = firstSplit[i].split("");
    for (let j = 0; j < secondSplit.length; j++) {
      numbers.push(parseInt(secondSplit[j]));
    }
  }
  let result = [];
  for (let i = 0; i < 4; i++) {
    if (numbers[i] !== undefined) {
      result.push(numbers[i]);
    }
  }
  result = result.join(" ");
  
  if (result.length === 0) {
    return false;
  }
  else {
    return result;
  }
}

app.post('/find4Digits', (req, res) => {
  const numStr = req.body.numStr;
  const result = find4Digits(numStr);
  res.send(`Result: ${result}`);
});

// Question 2

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/cookies', (req, res) => {
  let visits = parseInt(req.cookies.visits) || 0;
  let message = '';

  if (visits === 0) {
    message = 'Welcome to my webpage! It is your first time that you are here.';
    visits++;
  } else {
    const lastVisitTime = req.cookies.lastVisitTime;
    visits++;
    message = `Hello, this is the ${visits} time that you are visiting my webpage.<br>`;
    if (lastVisitTime) {
      const formattedDate = new Date(lastVisitTime).toLocaleString('en-US', {
        timeZone: 'America/Montreal',
        timeZoneName: 'short',
      });
      const correctedTimezone = formattedDate.replace('EDT', 'EST');
      message += `Last time you visited my webpage on: ${correctedTimezone} (EST= Eastern Standard Time Zone)`;
    }
  }

  res.cookie('visits', visits);
  res.cookie('lastVisitTime', new Date().toISOString());

  res.send(message);
});

// Question 3
function checkTelephoneNumber(number) {
  const regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(number);
}

app.post('/checkTelephoneNumber', (req, res) => {
  const phone = req.body.phone;
  const isValid = checkTelephoneNumber(phone);
  if (isValid) {
    res.send('The telephone number is correct.');
  } else {
    res.send('The telephone number is incorrect.');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
