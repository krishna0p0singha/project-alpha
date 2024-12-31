const { TestQuestion } = require('../Schema/TestQuestionListSchema');

const router= require('express').Router();

router.get('/test_list', async(req,res)=>{
    try {
        let examList = await TestQuestion.find();
        res.status(200).json({ success: true, examList });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch test" });
    }
});
module.exports=router;