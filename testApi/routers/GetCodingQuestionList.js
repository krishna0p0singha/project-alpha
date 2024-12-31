const router =require('express').Router();
const {CodingQuestion} =require('../Schema/CodingQuestion');

router.get('/get_coding_question_list',async ( req ,res)=>{
    try {
        let question = await CodingQuestion.find();
        if(question){
            res.status(200).json({ success: true, question })
        }
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

module.exports=router;
