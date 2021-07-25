const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id:{
        type:String, 
        require:true,
        unique:true},

    date:{type:String, require:true},
    name_carrier:{type:String, require:true},
    telephone:{type:String, require:true},
    comment:{type:String, require:false},

    owner:{type:Types.ObjectId, ref: "User"}
})

module.exports = model("Link", schema);

