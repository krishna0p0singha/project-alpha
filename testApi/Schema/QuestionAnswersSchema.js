const {model, default: mongoose} = require('mongoose');

const question_answer=new mongoose.Schema({
subjectCode: {
    type:String,
    required:true,
    unique: true
},
questionAnswer:[
    {
        qustion:{
            type:String,
            required:true,
        },
        answer:{
            type:String,
            required:true,
        }
    }
]
});

const QuestionAnswer= mongoose.model('questionAnswer',question_answer);

QuestionAnswer.createIndexes();

module.exports ={QuestionAnswer};