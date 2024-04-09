
function findSummation(N) {
    let sum = 0;
    for (let i = 1; i <= N; i++) {
        sum += i;
    }
    document.getElementById("summation").innerHTML = "result =" + sum;
    return sum;
}

function uppercaseFirstandLast(String) {
    String.split(" ");
    for (let i = 0; i < String.length; i++) {
        if (String[i] === " ") {
            String = String.slice(0, i) + String.charAt(i + 1).toUpperCase() + String.slice(i + 2);
            
        }
    }
    // let first = String.charAt(0).toUpperCase() + String.slice(1, -1);
    // let last = String.slice(-1).toUpperCase();
    // let result = first + last;
    document.getElementById("uppercaseFLresult").innerHTML = String;
}

// function findAverageAndMedian(numArray) {
//     let numArray = document.getElementById("numArray").value;
//     let arr = numArray.split(",");
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += parseInt(arr[i]);
//     }
//     let average = sum / arr.length;
//     arr.sort((a, b) => a - b);
//     let median;
//     if (arr.length % 2 === 0) {
//         median = (parseInt(arr[arr.length / 2]) + parseInt(arr[arr.length / 2 - 1])) / 2;
//     } else {
//         median = arr[Math.floor(arr.length / 2)];
//     }
//     document.getElementById("average").innerHTML = average;
//     document.getElementById("median").innerHTML = median;
// }

// function find4Digits(numbers) {
//     let numbers = document.getElementById("numbers").value;
//     let arr = split(" ");
//     let result = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (result.length < 4) {
//             if (arr[i] === number) {
//                 result.push(arr[i]);
//             }
//         }
//     }
//     document.getElementById("4digits").innerHTML = result;
// }

