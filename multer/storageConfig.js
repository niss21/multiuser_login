// const multer = require("multer");


// // storage config
// const storage = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,"./uploads")
//     },
//     filename:(req,file,callback)=>{
//         const filename = `image-${Date.now()}.${file.originalname}`
//         callback(null,filename)
//     }
// });

// // filter 
// const filefilter = (req,file,callback)=>{
//     if(file.mimetype === "image/png" ||file.mimetype === "image/jpg" ||file.mimetype === "image/jpeg"  ){
//         callback(null,true)
//     }else{
//         callback(null,false)
//         return callback(new Error("Only .png .jpg & .jpeg formatted Allowed"))
//     }
// }

// const upload = multer({
//     storage:storage,
//     fileFilter:filefilter
// });

// module.exports = upload;


const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)

        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// const upload = multer({ storage: storage })

module.exports = {
    // upload,
    storage
}