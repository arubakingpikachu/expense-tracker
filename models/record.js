const mongoose=require('mongoose')
const { Schema } = mongoose

const recordSchema = new Schema({
  name:{
    type:String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  amount:{
    type:Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
      ref:'user',
      index:true,
      required: true
  },
  categoryId:{
      type: Schema.Types.ObjectId,
      ref:'category',
      index:true,
      required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)