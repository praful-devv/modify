const imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const ImageKit = new imagekit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });

async function uploadFile({buffer,filename,folder=""}){

    const file = await ImageKit.files.upload({
      file: await imagekit.toFile(Buffer.from(buffer), filename),
      fileName: filename,
      folder,
    });

    return file
}

module.exports = {uploadFile}