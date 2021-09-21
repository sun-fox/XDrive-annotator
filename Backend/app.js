var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs');
    
// Allow Cross-Origin Requests
app.use(cors());

//allow mongoose requests 
mongoose.connect("mongodb://localhost/Bounding-boxes",{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("database connected.....")
});

app.get('/', (req, res)=>{
    res.send('Hello Sir')
})

app.get('/say', (req, res)=>{
    res.send('Hello Sir')
})

app.get('/get_images', (req,res)=>{
    //joining path of directory 
    const directoryPath = path.join(__dirname, '../Frontend/x-drive/public/images');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        var arr=[]
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var filePath = path.join('/images', file);
            arr.push(filePath)
            console.log(filePath); 
        });
        res.send(arr);
    });
})

app.listen(4000, ()=>{
    console.log("X-Drive Backend server live at PORT:4000");
})
