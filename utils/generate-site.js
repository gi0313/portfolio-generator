const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if theres an error, reject the promise and send the error to the promise's catch() method
            if (err) {
                reject (err);
                //return out of the function here to make sure the promise doesnt accidentaly execute the resolve() function as well
                return;
            }
            //if everything went well resolve the promise and send the successful data to the .then() method
            resolve({
                ok: true,
                message: 'file created!'
            })
        })
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
             if (err) {
                 reject (err);
                 return;
             }
             resolve({
                 ok: true,
                 message: 'file copied!'
             })
    })
})
}

// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
// }
    //We're actually exporting an object with the two functions, writeFile() and copyFile(), 
    //used as methods, writeFile and copyFile.
module.exports = { writeFile, copyFile };