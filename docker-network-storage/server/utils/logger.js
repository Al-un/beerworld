const fs = require("fs");
const readline = require("readline");

const logFilePath = (process.env.APP_LOG_FOLDER || "./") + "some_log.txt";

/**
 * Append a simple log in a text file
 *
 * Write file: https://nodejs.dev/writing-files-with-nodejs
 * @param {String} msg to be added log
 */
const log = async (msg) => {
  const timeStamp = new Date();
  const log = { ...msg, time: timeStamp.toUTCString() };
  console.log(log);

  try {
    fs.writeFile(
      logFilePath,
      `${JSON.stringify(log)}\n`,
      { flag: "a+" },
      (err) => {
        if (err) {
          console.warn(err);
        }
      }
    );
  } catch (err) {
    console.warn(err);
  }
};

const fetchLogs = async () => {
  // https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
  try {
    const fileStream = fs.createReadStream(logFilePath, { encoding: "utf8" });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let result = [];
    for await (const line of rl) {
      try {
        const parsed = JSON.parse(line);
        result = [...result, parsed];
      } catch (err) {
        console.error(`Error when parsing ${line}: `, err);
      }
    }

    return result;
  } 
  // Return empty logs in case of error
  catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { log, logFilePath, fetchLogs };
