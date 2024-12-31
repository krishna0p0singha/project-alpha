const router= require('express').Router();
//const {QuestionAnswer} =require('../Schema/QuestionAnswersSchema');


router.get('/add_question_answers', async (req,res)=>{
   /* console.log("hello");
    var obj={
        subjectCode:"dsq1",
        questionAnswer:[{
            qustion: "Why",
            answer:"you"
        }]
    };
    try {
        QuestionAnswer.updateOne({subjectCode:"dsq1"}, 
            {
              $push   :{questionAnswer:{
            qustion: "Why2",
            answer:"you"}}
        },function(err,result){
            if(err) throw err;
        })
      
    } catch (error) {
        
    }*/
});
module.exports=router;