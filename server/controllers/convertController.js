const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/CustomError')
const ytdl = require('@distube/ytdl-core')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const crypto = require('crypto')

function generateRandomFileName() {
    return crypto.randomBytes(16).toString('hex') + '.mp3';
}

exports.convert = asyncErrorHandler( async(req, res, next) => {

    const videoUrl = req.body.url

    if(!ytdl.validateURL(videoUrl)) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid url.'
        })
    }
    
    const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("./cookies.json")))

    const audioTitle = (await ytdl.getInfo(videoUrl)).videoDetails.title
    const fileName = audioTitle + ".mp3"
    const filePath = path.join(__dirname, '../output/', fileName)

    if(fs.existsSync(filePath)) {
        const downloadLink = `${req.protocol}://${req.get('host')}/api/serve/${fileName}`
        return res.json({
            downloadLink
        })
    }

    const convertStream = ytdl(videoUrl, {filter: 'audioonly', quality: 'highestaudio'});

    convertStream.pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
            const downloadLink = `${req.protocol}://${req.get('host')}/api/serve/${fileName}`
            res.json({
                downloadLink
            })
        })
})

exports.serve = asyncErrorHandler(async(req, res, next) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../output', fileName)

    setTimeout(() => {
        fs.unlink(filePath, err => {
            if(err) throw err
        })
    }, 15000);

    if(fs.existsSync(filePath)) {
        res.download(filePath)
    } else {
        res.status(404).json({message: 'File not found'});
    }
})