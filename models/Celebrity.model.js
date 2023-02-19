//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
    name:{
        type: String,
    },
    occupation:{
        type: String,
        enum: ["Actor", "Actris", "Singer", "Comedian","Else"]
    },
    catchPrashe:{
        type: String,
    }
})

const Celebrity = model("celebrity", celebritySchema);
module.exports = Celebrity;