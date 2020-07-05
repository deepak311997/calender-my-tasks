const fs = require('fs');
const path = require('path');

function getConfiguration() {
    let confdata;
  
    try {
      confdata = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));
    } catch (error) {
      console.error(`Configuration Error: ${error.message}`);
      process.exit(1);
    }
  
    return confdata;
}

module.exports = {
    getConfiguration,
}