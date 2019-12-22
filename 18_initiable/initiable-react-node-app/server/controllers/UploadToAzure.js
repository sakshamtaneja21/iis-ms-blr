const express = require("express");
const _ = require("lodash");
const router = express.Router();
var azure = require("azure-storage");
var blobService = azure.createBlobService(
  "initiable",
  "+L3U+dbj/0xQz3fKKB7JLRyHPD2YZ8ojOwbe3rC13M9DjIwZBGaaa6AB0AGPgpDOj3uI0xG+pVjmGUAdhOPJEg=="
);
const { Url } = require('../models/file');


blobService.createContainerIfNotExists(
  "hackathon",
  {
    publicAccessLevel: "blob"
  },
  function(error, result, response) {
    if (!error) {
      // if result = true, container was created.
      // if result = false, container already existed.

      console.log("result", result);
    }
  }
);

let filepath = `/home/shreedhar/`;

router.post("/file", function(req, res) {
  let body = req.body.fileName;
  // let body = req.body
  console.log("req", body);

  let fileName = req.body.fileName;

  blobService.createBlockBlobFromLocalFile(
    "hackathon",
    fileName,
    `${filepath}/${fileName}`,
    function(error, result, response) {
      if (!error) {
        console.log("uploaded", response);
        let url = blobService.getUrl("hackathon", fileName)
        console.log('url', url)
        let newUrl = new Url({url: url, fileName: fileName});
        newUrl.save().then(fileSavedResponse =>{
          console.log('fileSavedResponse', fileSavedResponse);
          res.send({url: fileSavedResponse.url});
        }        
        ).catch(error => {
          console.log(error);
        })
      }
    }
  );
});

module.exports = {
  uploadToAzure: router
};
