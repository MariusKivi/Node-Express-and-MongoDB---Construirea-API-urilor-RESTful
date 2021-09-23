module.exports.getCustomerSync = function(id) {
    console.log('Citirea unui client de pe MongoDB ...');
    return { id: id, points: 11 };
}

module.exports.getCustomer = async function(id) {
    return new Promise((resolve, reject) => {
        console.log('Citirea unui client de pe MongoDB ...');
        resolve({ id: id, points: 11 });
    });
}