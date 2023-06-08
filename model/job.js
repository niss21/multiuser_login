const mongoose = require('mongoose');


//   {
//   title: {
//     type: String,
//     required: true,
//   },
//   company: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
  // skills: {
  //   type: [String],
  //   required: true,
  // },
//   salary: {
//     type: Number,
//     required: true,
//   },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// }

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobsSchema = new Schema(
{
  title: {
      type:String,
      },  
  company: {
      type:String
  },  
  location: {
      type:String
  },  
  phone:{
      type:String,
  },
  website: {
      type:String
  },
  requirements: {
      type:String
  },  
  salary: {
    type:String
  },
  vacancy: {
    type:String
  },
  skills: {
    type: [String],
    required: true,
  },
  category: {
      type:String
  },  
  posted_date: {
      type:Date
  },  
  closing_date: {
      type:Date
  }, 
  description: {
      type:String
  },  
  created_by: {
      type: ObjectId,
      ref: "User",
      required: true,
  },
  images: {
      type: [String]
  }
}

);

module.exports = mongoose.model("Jobs", JobsSchema)