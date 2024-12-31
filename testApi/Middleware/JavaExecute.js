const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const getTimeStamp = function(){
  d = new Date();
  return d.getTime();
}
const libDirectory = path.resolve(__dirname, '../Lib/java');
const javaFilePath = path.join(libDirectory, `${getTimeStamp()}Main.java`);

// Ensure directory exists
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Asynchronously delete all files in the directory
const deleteAll = async () => {
  ensureDirectoryExists(libDirectory);
  const files = await fs.promises.readdir(libDirectory);

  await Promise.all(files.map(async (file) => {
    const filePath = path.join(libDirectory, file);
    await fs.promises.unlink(filePath);
    console.log(`Deleted file: ${file}`);
  }));
};

// Function to execute a single test case
const executeTestCase = (program, inputCase, outputCase) => {
  return new Promise((resolve, reject) => {
    ensureDirectoryExists(libDirectory);

    // Write Java file asynchronously
    fs.promises.writeFile(javaFilePath, program)
      .then(() => {
        exec(`javac ${javaFilePath}`, (compileErr, stdout, stderr) => {
          if (compileErr) {
            const errorMsg = stderr.split("Main.java:");
            reject({ error: `line: ${errorMsg[1].trim()}` });
            return;
          }
          const start = performance.now();
          // Execute the compiled Java class with input
          exec(`java -cp ${libDirectory} Main ${inputCase}`, (runErr, runStdout, runStderr) => {
            if (runErr) {
              reject({ error: runStderr || runErr.message });
              return;
            }
            const end = performance.now();
            // console.log(runStdout);
            // Compare output with expected output
            resolve(runStdout.trim() === outputCase.trim());
          });
        });
      })
      .catch(reject);
  });
};

// Function to execute all test cases
const executeJava = async (program, testCases) => {
  ensureDirectoryExists(libDirectory);

  const { inputCase, outputCase } = testCases;
  if (inputCase.length !== outputCase.length) {
    throw new Error("Mismatch between input and output test cases count.");
  }

  try {
    const results = await Promise.all(
      inputCase.map((input, i) => executeTestCase(program, input, outputCase[i]))
    );

    await deleteAll();
    return results;
  } catch (error) {
    await deleteAll();
    throw error;
  }
};

module.exports = { executeJava };
