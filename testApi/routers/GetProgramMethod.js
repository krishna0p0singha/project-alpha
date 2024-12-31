const router = require('express').Router();
const { CodingQuestion } = require('../Schema/CodingQuestion');

router.get('/get_program_method',async (req,res)=>{
    try {
        const question = await CodingQuestion.findOne();
        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

module.exports=router;
