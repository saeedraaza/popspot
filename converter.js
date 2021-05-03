let axios = require('axios');
let async = require('async');

let tryAgain = [];

async function convert(transactions) {
    let converted;
    tryAgain = transactions;
    for (let tries = 0; tries < 3; tries++) {
        if (tryAgain.length > 0) {
            let response = (await convertTransactions(tryAgain)).filter(val => val);
            if (converted) {
                converted = [...converted, ...response]
            } else {
                converted = response;
            }
        } else {
            break
        }
    }
    if (tryAgain.length > 0) {
        console.error("Error: Following transactions could not be converted after 3 tries");
        console.log(tryAgain)
    }
    return converted;
}

async function convertTransactions(transactions) {
    tryAgain = [];
    let toBeConverted = [];
    transactions.forEach(transaction => {
        toBeConverted.push(function(callback){
            axios.get(`${process.env.API_BASE_URL}/${transaction.createdAt.substring(0, 10)}?access_key=${process.env.API_ACCESS_KEY}&base=EUR`)
                .then(res => {
                    let converted = (1 / res.data.rates[transaction.currency]) * transaction.amount;
                    callback(null, {...transaction, convertedAmount: parseFloat(converted.toFixed(4))});
                })
                .catch(err => {
                    console.error("Error: Failed to convert the transaction");
                    console.error(err.message);
                    tryAgain.push(transaction);
                    callback(null)
                });
        });
    });
    return async.parallelLimit(toBeConverted, 100);
}

exports.convert = convert;
