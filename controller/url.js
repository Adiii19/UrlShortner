const shortId  = require("shortid");
const URL= require('../models/url');

async function handleGenerateNewShortURL(req,res) {
      const body=req.body
      if(!body.url) return res.status(400).json({error:'url is required'})
     const shortid=shortId();

    await URL.create({
        shortId:shortid,
        redirectURL:body.url,
        visitedHistory:[]
    })

    return res.json({id:shortid,redirectURL:body.url})

}


module.exports={
    handleGenerateNewShortURL
}