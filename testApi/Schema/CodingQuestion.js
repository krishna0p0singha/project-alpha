const {model, default: mongoose} = require('mongoose');

const coding_Question =new mongoose.Schema({
    questionID: {
        type: Number,
        required : true,
        unique: true
    },
    question:{
        type: String,
        required : true
    },
    explanation:{
        type: String,
        required : true
    },
    questionLevel:{
        type: String,
        required : true
    },
    writeMethod:{
        type:String,
        required: true
    },
    mainMethod:{
        type:String,
        required: true
    },
    tags:[],
    testCases:{
        inputCase:[],
        outputCase:[]
    }
})

const CodingQuestion=mongoose.model("codingQuestions",coding_Question);
CodingQuestion.createIndexes();

module.exports={CodingQuestion};