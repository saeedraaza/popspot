let transactions = require('./transactions');
let converter = require('./converter');
require('dotenv').config();


(async () => {
    let responses = await transactions.getTransactions();
    let converted = await converter.convert(responses);
    let posted = await transactions.postTransactions(converted);
    console.log(posted.data)
})();