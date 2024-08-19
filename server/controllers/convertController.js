const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/CustomError')
const ytdl = require('@distube/ytdl-core')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const crypto = require('crypto')

const filterUrl = (url) => {
    if(url.includes('youtube.com') || url.includes('https://youtube.com')) {
        let filteredUrl = url.split('v=')[1]
        if(filteredUrl.includes('&')) {
            filteredUrl = filteredUrl.split('&')[0]
            console.log(filteredUrl)
        }
        console.log(filteredUrl)
        return filteredUrl
    } else if (url.includes('youtu.be') || url.includes('https://youtu.be')) {
        let filteredUrl = url.split('youtu.be')[1]
        filteredUrl = filteredUrl.split('?')[0].replace(/\//g, "")
        console.log(filteredUrl)
        return filteredUrl
    } else {
        throw new CustomError('Provided invalid link', 400)
    }
}

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

    const fileName = generateRandomFileName()
    const filePath = path.join(__dirname, '../output/', fileName)

    const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("./cookies.json")))

    const audioTitle = (await ytdl.getInfo(videoUrl)).videoDetails.title
    console.log(audioTitle)
    const convertStream = ytdl(videoUrl, {filter: 'audioonly', quality: 'highestaudio'});

    convertStream.pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
            const downloadLink = `${req.protocol}://${req.get('host')}/api/serve/${fileName}`
            console.log(downloadLink)
            res.json({
                downloadLink,
                title: audioTitle
            })
        })
})

exports.serve = asyncErrorHandler(async(req, res, next) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../output', fileName)
    console.log(filePath)

    if(fs.existsSync(filePath)) {
        res.download(filePath)
    } else {
        res.status(404).json({message: 'File not found'});
    }
})