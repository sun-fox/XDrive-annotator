const mongoose = require('mongoose');
const annotationSchema = mongoose.Schema({
    img_src: String,
    img_name: String,
    detects: [{
        coordinates:{   
            x:Number,
            y:Number,
            w:Number,
            h:Number
        },
        confidence: Number,
        object: String
    }]
})

module.exports = mongoose.model('annotation',annotationSchema);