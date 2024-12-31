const { CodingQuestion } = require('../Schema/CodingQuestion');
const { TestQuestion } = require('../Schema/TestQuestionListSchema');

const router= require('express').Router();

router.post('/fetch_test_question', async (req,res)=>{
    // console.log(req.body);
    try{
        let questionList=await CodingQuestion.find();
        let questionIdList=await TestQuestion.findOne(req.body);
        let questions=questionList.filter((questionObj)=> questionIdList['codingQuestionID'].some(obj  => 
            questionObj['questionID'] === obj));
        // console.log(questions);
        res.status(200).json({ success: true, questions });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test Question" });
    }
});

module.exports=router;