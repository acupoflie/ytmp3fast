const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/CustomError')
const ytdl = require('@distube/ytdl-core')
const fs = require('fs')

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

    const videoUrl = req.body.url
    const filteredUrl = filterUrl(videoUrl)

    const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("./cookies.json")))

    ytdl('https://youtu.be/Z7shb-2SxXM?si=v_aySPoNrRtDN5SN', {filter: "audioonly"}).pipe(fs.createWriteStream('./output/music.mp3'))
    res.status(200).json({status: "blabla"})
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