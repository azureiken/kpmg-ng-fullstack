var fs = require('file-system');

FileController = function () { };

FileController.prototype.uploadFile = function (req, res) {
    console.log('File received: ', req.files)
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    console.log('Name: ', file.name);
    console.log('Type: ', file.type);
    console.log('Data: ', file.data);

    fs.readFile(file.path, function (err, data) {
        // ...
        var newPath = __dirname + "/uploads/" + file.name;
        var newFilePath = newPath;
        
        if (checkFile(newPath)) {
            newFilePath = newPath + '1';
        } 
        fs.writeFile(newFilePath, data, function (err) {
            res.redirect("back");
        });

    });
}

FileController.prototype.uploadFiles = function (req, res) {
    console.log('Files received: ', req.files)
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files[0].file;
    console.log(file.name);
    console.log(file.type);
}

var checkFile = function (fileName) {
    var filePath = fileName;
    if (
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.stat(fileName, function (err, stats) {
                    console.log('File Stats is:', stats ? stats : err);
                })
                return true;
            } else return false;
        })) { return true } else return false;
}

module.exports = new FileController();