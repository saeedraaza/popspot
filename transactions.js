let axios = require('axios');
let async = require('async');

async function getTransactions() {
    let requests = [];
    for (let i = 0; i < process.env.TRANSACTIONS_COUNT; i++) {
        requests.push(function(callback){
            axios.get(process.env.TRANSACTIONS_GET_URL)
                .then(res => callback(null, res.data))
                .catch(err => {
                    console.error("Error: Failed to fetch the transaction");
                    console.error(err.message);
                    console.error(err.response.data.message);
                });
        });
    }
    return async.parallelLimit(requests, 100);
}

async function postTransactions(transactions) {
    return axios.post(process.env.TRANSACTIONS_POST_URL, {transactions: transactions});
}

exports.getTransactions = getTransactions;
exports.postTransactions = postTransactions;
