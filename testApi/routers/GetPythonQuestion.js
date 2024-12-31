const router = require('express').Router();


router.post('/get_python_question', async(req,res)=>{
    console.log("python");
    res.send({status : "python"});

});

module.exports=router;
