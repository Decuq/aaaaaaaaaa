const fs = require('fs');
const extract = require('extract-zip')
const path = require('path')


const source = "C:/Users/Mati/Desktop/elo/pom.zip"
const target = "jajko"

async function extractZip(source, target) {
    try {
      await extract(source, { dir: target });
      console.log("Extraction complete");
    } catch (err) {
      console.log("Oops: extractZip failed", err);
    }
  }

  const unzipFiles = async function (dirPath) {
    const files = fs.readdirSync(dirPath);
    let zippedFiles = []
    await Promise.all(
      files.map(async (file) => {
        if (file !== "node_modules")
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          await unzipFiles(dirPath + "/" + file);
        } else {
          const fullFilePath = path.join(dirPath, "/", file);
          console.log(fullFilePath);
          const folderName = file.replace(".zip", "");
          if (file.endsWith(".zip")) {
            zippedFiles.push(folderName);
            await extractZip(fullFilePath, path.join(dirPath, "/"));
            await unzipFiles(path.join(dirPath, "/", folderName));
          }
        }
      })
    );
  };
  unzipFiles("C:/Users/Mati/Desktop/elo");