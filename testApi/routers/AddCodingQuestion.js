const { CodingQuestion } = require('../Schema/CodingQuestion');

const router = require('express').Router();
var d=new Date();

router.post('/add_coding_question',async (req,res)=>{
    console.log(req.body);
    const codingQuestions={
        questionID: (function(){
            return new Date().getTime();
        })(),
        question: req.body.question,
        explanation: req.body.explanation,        
        questionLevel: req.body.questionLevel,
        writeMethod: req.body.writeMethod,
        mainMethod: req.body.mainMethod,
        tags: (req.body.tags.length !== 0) ? req.body.tags : ["No topic Found"],
        testCases: req.body.testCases,
    };
    try {
        let data = new CodingQuestion(codingQuestions);
        let result = await data.save();
        if(result){
            res.status(201).json({message : 'Data Added'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Failed to Added'});
    }

});

module.exports=router;