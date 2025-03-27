const router = require("express").Router();
const generateUrl = require("../Utilities/S3");

//generates a unique url for the photo uploaded to the aws s3 bucket
router.get("/s3-url", async (req, res) => {
    try {
        const s3Url = await generateUrl();
        console.log(s3Url);
        res.status(200).json(s3Url);
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `S3 Error: ${err}`
        })
    }
});



module.exports = router;