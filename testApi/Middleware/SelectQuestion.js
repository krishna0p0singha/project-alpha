const {CodingQuestion} = require('../Schema/CodingQuestion');
const {TestQuestion}=require('../Schema/TestQuestionListSchema');
const { getNumbers } = require('./GenerateRnadomNumbers');

const selectCodingQuestion= async()=>{
    try {
        const list = getNumbers(4, 1, 4);
        const results = await CodingQuestion.find();
        if (!results || results.length === 0) {
            throw new Error("No coding questions found");
        }

        const questionList = list
            .filter((index) => index < results.length+1) // Ensure indices are within bound
            .map((index) => results[index-1].questionID); 
            console.log(questionList);
            if(questionList){
                let data={
                    examId:(function(){
                        return new Date().getTime();
                    })(),
                    codingQuestionID:questionList
                };
               let result=new TestQuestion(data);
               result=result.save();
            }
        return ["Question Selected..."];
    } catch (error) {
        console.error("Error in select Coding Question:", error.message);
        return ["Error fetching questions..."];
    }
}
module.exports={selectCodingQuestion};
