const {model, default: mongoose} = require('mongoose');

const Test_Question=new mongoose.Schema({
    examId:{
        type: String,
        require: true
    },
    codingQuestionID:[],
});
const TestQuestion=mongoose.model('testQuestion',Test_Question);
TestQuestion.createIndexes();
module.exports={TestQuestion};
