var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    axios = require('axios');
    
const annotationSchema = require('./models/annotation')

// Allow Cross-Origin Requests
app.use(cors());
app.use(express.json());

//Storage Engine
const storage = multer.diskStorage({
    destination: '../Frontend/x-drive/public/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

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

app.get('/get_datasets', (req,res)=>{
    //joining path of directory 
    const directoryPath = path.join(__dirname, '../Frontend/x-drive/public/datasets');
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
            // var filePath = path.join('/images', file);
            arr.push(file)
            // console.log(file); 
        });
        res.send(arr);
    });
})

app.get('/get_images/:folder', (req,res)=>{
    // console.log("Kaam kar rha")
    //joining path of directory 
    const directoryPath = path.join(__dirname, '../Frontend/x-drive/public/datasets/'+req.params.folder);
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
            var filePath = path.join('/datasets/'+req.params.folder, file);
            arr.push(filePath)
            // console.log(filePath); 
        });
        res.send(arr);
    });
})

app.post("/upload", upload.single('images'), (req,res)=>{
    console.log(req.file)
    axios.post('http://172.18.12.202:5000//image', {
        images: '',
    })
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch((error) => {
        console.error(error)
    })
})

app.post("/new_annotations", async (req,res)=>{
    console.log("The New Annotations Received!!!");
    console.log(req.body);
    let annotation = {
        img_src: req.body.src,
        img_name: req.body.name,
        detects:[]
        }

    req.body.regions.forEach(obj=>{
        annotation.detects.push({
            coordinates:{   
                x:obj.x,
                y:obj.y,
                w:obj.w,
                h:obj.h
            },
            confidence: 100,
            object: obj.cls
        })
    })
    console.log(annotation);
    await new annotationSchema(annotation).save()
})

app.post("/auto_annotations", async (req,res)=>{
    console.log("The Auto Annotations Received!!!");
    console.log(req.body);
    // let annotation = {
    //     img_src: req.body.src,
    //     img_name: req.body.name,
    //     detects:[]
    //     }

    // req.body.regions.forEach(obj=>{
    //     annotation.detects.push({
    //         coordinates:{   
    //             x:obj.x,
    //             y:obj.y,
    //             w:obj.w,
    //             h:obj.h
    //         },
    //         confidence: 100,
    //         object: obj.cls
    //     })
    // })
    // console.log(annotation);
    // await new annotationSchema(annotation).save()
})

app.listen(4000, ()=>{
    console.log("X-Drive Backend server live at PORT:4000");
})
