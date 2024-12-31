const { model } = require('mongoose');
const { selectCodingQuestion } = require('../Middleware/SelectQuestion');

const router = require('express').Router();
router.get('/get_test_questions', async (req, res) => {
    try {
        const question = await selectCodingQuestion(); 
       //console.log(question); 
        res.status(200).json({ success: true, question })
    } catch (error) {
        console.error("Error fetching test questions:", error.message);
        res.status(500).json({ error: "Failed to fetch test questions" });
    }
});

module.exports=router;