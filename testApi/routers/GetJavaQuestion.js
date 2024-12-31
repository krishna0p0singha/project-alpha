const router = require('express').Router();
const { CodingQuestion } = require('../Schema/CodingQuestion');

router.post('/get_java_question', async(req,res)=>{

    try {
        const question = await CodingQuestion.findOne(req.body);
        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

module.exports=router;
