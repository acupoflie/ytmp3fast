const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/CustomError')
const ytdl = require('@distube/ytdl-core')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')

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

exports.convert = asyncErrorHandler( async(req, res, next) => {

    const videoUrl = req.params.url

    if(!ytdl.validateURL(videoUrl)) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid url.'
        })
    }

    const fileName = Date.now() + '.mp3'
    const filePath = path.join(__dirname, '../output/', fileName)

    const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("./cookies.json")))
    ytdl(videourl, {filter: 'audioonly'}).pipe(fs.createWriteStream(filePath))

    res.status(200).json({status: "blabla"})








    /* WORKING WITH RAPID API */

    // const fetchAPI = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${filteredUrl}`, {
    //     "method": "GET",
    //     "headers": {
    //         'x-rapidapi-key': process.env.API_KEY,
    //         'x-rapidapi-host': process.env.API_HOST
    //     }
    // })

    // const fetchResponse = await fetchAPI.json();

    // if(fetchResponse.status === 'ok') {
    //     res.status(200).json({
    //         status: "success",
    //         url: fetchResponse.link
    //     })
    // } else {
    //     res.status(400).json({
    //         status: "fail"
    //     })
    // }

})