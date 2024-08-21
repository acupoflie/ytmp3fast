const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/CustomError')
// const ytdl = require('@distube/ytdl-core')
const ytdl = require('ytdl-core')
const fs = require('fs')
const path = require('path')
const HttpsProxyAgent = require('https-proxy-agent');
const tunnel = require('tunnel')

exports.convert = asyncErrorHandler(async (req, res, next) => {

    const videoUrl = req.body.url

    if (!ytdl.validateURL(videoUrl)) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid url.'
        })
    }

    console.log('1')
    // const proxyUrl = 'https://w1yWDq:J682Go@194.28.210.17:9586';
    // const proxyAgent = new HttpsProxyAgent(proxyUrl);

    const proxy = tunnel.httpsOverHttp({
        proxy: {
            host: '194.28.210.17',
            port: '9586',
            proxyAuth: 'w1yWDq:J682Go'
        }
    })

    console.log('1')
    // const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("./cookies.json")))
    // const agent = ytdl.createProxyAgent({uri: '194.28.210.17:9586'}, JSON.parse(fs.readFileSync('./cookies.json')))
    // console.log(agent)
    const audioTitle = ( await ytdl.getInfo(videoUrl)).videoDetails.title
    console.log('2')
    const fileName = audioTitle + ".mp3"
    const filePath = path.join(__dirname, '../output/', fileName)
    console.log(audioTitle) 
    console.log('1')

    if (fs.existsSync(filePath)) {
        const downloadLink = `${req.protocol}://${req.get('host')}/api/serve/${fileName}`
        return res.json({
            downloadLink
        })
    }

    const convertStream = ytdl(videoUrl, {requestOptions: {} , filter: 'audioonly', quality: 'highestaudio' });

    convertStream.pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
            const downloadLink = `${req.protocol}://${req.get('host')}/api/serve/${fileName}`
            res.json({
                downloadLink
            })
        })
})

exports.serve = asyncErrorHandler(async (req, res, next) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../output', fileName)

    setTimeout(() => {
        fs.unlink(filePath, err => {
            if (err) throw err
        })
    }, 15000);

    if (fs.existsSync(filePath)) {
        res.download(filePath)
    } else {
        res.status(404).json({ message: 'File not found' });
    }
})


