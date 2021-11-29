var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    axios = require('axios'),
    fs = require('fs'),
    FormData = require('form-data'),
    bodyParser = require('body-parser');
    
const annotationSchema = require('./models/annotation')

//allow mongoose requests 
mongoose.connect("mongodb://localhost/Bounding-boxes",{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("database connected.....")
});

// Allow Cross-Origin Requests
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dat_name = req.params.dataset
        const dir = `../Frontend/x-drive/public/datasets/${dat_name}`
        console.log(dir+'1')
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            return cb(null, dir)
        }
        else{
            return cb(null, dir)
        }
    },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

app.post("/upload_dataset/:dataset", upload.array("imagesArray", 100), (req, res) => {
  const reqFiles = [];
  console.log(req.params)
//   console.log(req.files)
  const url = req.protocol + "://" + req.get("host");

  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/" + req.files[i].filename);
  }

  res.json(reqFiles);
});


// app.post("/annotate_dataset", (req,res)=>{
//     console.log("dataset",req.body)

//     var data = new FormData();
//     data.append('dataset', req.body);
//     var info
//     var config = {
//     method: 'post',
//     url: 'http://192.168.0.104:5000/annotate_dataset',
//     data : data
//     };

//     axios(config)
//     .then(function (response) {
//         info = JSON.stringify(response.data)
//         console.log(info);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
//     res.send(info)
// })

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

app.get('/get_annotated_images/:folder', (req,res)=>{
    console.log(req.params.folder)
    //joining path of directory 
    const directoryPath = path.join(__dirname, '../Frontend/x-drive/public/detections/datasets/'+req.params.folder);
    console.log(directoryPath)
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        var arr=[]
        files.forEach(function (file) {
            if(file.split('.')[1]=='jpg'){
                // Do whatever you want to do with the file
                var filePath = path.join('/detections/datasets/'+req.params.folder, file);
                arr.push(filePath)
                console.log(filePath); 
            }
        });
        res.send(arr);
    });
})

app.get('/get_report/:folder', (req,res)=>{
    console.log(req.params.folder)
    //joining path of directory 
    const filepath = path.join(__dirname, '../Frontend/x-drive/public/detections/datasets/'+req.params.folder+"/report.json");
    console.log(filepath);
    var obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    res.send(obj.report);
})

app.get('/check/:folder',(req,res)=>{
    const dir = path.join(__dirname, '../Frontend/x-drive/public/detections/datasets/'+req.params.folder);
    var flag=false;
    if (fs.existsSync(dir)){
        flag=true;
    }
    res.send({'flag':true})
})


// // Storage Engine
// const storage2 = multer.diskStorage({
//     destination: '../Frontend/x-drive/public/images',
//     filename: (req, file, cb)=>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload2 = multer({
//     storage: storage2
// })
// app.post("/upload", upload2.single('images'), (req,res)=>{
//     console.log(req.file)
//     axios.post('http://192.168.0.104:5000/image', {
//         images: '',
//     })
//     .then((res) => {
//         console.log(`statusCode: ${res.statusCode}`)
//         console.log(res)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
// })

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

app.listen(4000, ()=>{
    console.log("X-Drive Backend server live at PORT:4000");
    console.log("__dirname set to: ", __dirname)
})
