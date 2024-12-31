const router = require('express').Router();
const {executeJava} = require('../Middleware/JavaExecute');
const { CodingQuestion } = require('../Schema/CodingQuestion');

router.post('/java_program_execute',async (req,res )=>{
  try {
          const question = await CodingQuestion.findOne({questionID: req.body.questionID});

          let program =`import java.util.Arrays;
          class Main{
                            ${req.body.program}
                            ${question.mainMethod}
                        }`;
          // console.log(program,question.testCases);
          executeJava(program, question.testCases)
          .then((output) => {
            // console.log("Execution Result:", output);
            res.status(200).json({ success: true, output });
          })
          .catch((error) => {
            console.error("Execution Error:", error);
            res.status(500).json({ success: false, error });
          });
        
  } catch (error) {
    
  }
 
});

module.exports = router;