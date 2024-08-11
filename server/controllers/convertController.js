const asyncErrorHandler = require('../utils/asyncErrorHandler')

exports.convert = asyncErrorHandler( async(req, res, next) => {

    const videoId = req.params.id
    console.log(videoId)
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        "method": "GET",
        "headers": {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST
        }
    })

    const fetchResponse = await fetchAPI.json();

    if(fetchResponse.status === 'ok') {
        res.status(200).json({
            status: "success",
            url: fetchResponse.link
        })
    } else {
        res.status(400).json({
            status: "fail"
        })
    }

})