const path = require('path')
const multer = require('multer')

var upload = multer({
    storage : multer.diskStorage({}),
    fileFilter : (req, file, callback)=>{
        if(file.mimetype.match(/jpg|png|jpe|$i/))
        {
            callback(null, true)
            console.log("Done!")
        }
         else{
             console.log("only jpg & png file supporter")
             callback(null, false)
         }   
    }
}) 

module.exports = upload