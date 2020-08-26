const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const path = process.argv[3];

readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (url && path) {
  request(url,(error, response, body) => {

    if (error) {
      console.log(`Invalid URL.Please enter valid URL `);
      console.log('---------------------------------------------------------------------');
      console.log(`Please see the errors  \n ${error}`);
      process.exit();
    } else {

      if (fs.existsSync(path)) {

        console.log("\nFile already exists. Please enter y/Y to overwrite the file or n/N to skip and exit");
        
        process.stdin.on('data', (key) => {

          if (String(key) === "y" || String(key) === "Y") {
            fs.writeFile(path, body, function(err) {
              if (err) {
                return console.log(err);
              }
              let fileSize = (body !== null) ? body.length : 0;
              console.log(`\nDownloaded and saved ${fileSize} bytes to ${path}`);
              console.log('---------------------------------------------------------------------');
              process.exit();
            });
          } else if (String(key) === "n" || String(key) === "N") {
            console.log("\nDownload Cancelled !.");
            process.exit();
          } else if (String(key) === '\u0003') {
            process.exit();
          } else {
            console.log("\nPlease enter valid input");
          }
        });
      } else {
        console.log("\nInvalid file path or file path not found. Please enter valid file path.");
        console.log('---------------------------------------------------------------------');
        process.exit();
      }
    }
  });
} else {
  console.log("Please enter input values (Url & file path) ");
  process.exit();
}

//node fetcher.js http://www.example.edu/ ./index.html