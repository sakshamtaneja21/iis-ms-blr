const express = require('express');


const router = express.Router();
const { Url } = require('../models/file');

router.post('fileUpload', (req, res) => {
	let filePath = req.body.filePath ? req.body.filePath: '';
	if(!filePath){
		res.send({error: 'No file path found'});
		return;
	}
})

router.post('/csvurl',(req, res) => {

	console.log('url', req.body)

	Url.find().then(url => {
		console.log('url',url)
		res.send({url:url})
	})
})

module.exports = {
	filesRouter: router	
}