const { cloudinary } = require("../Cloudinary/cloudinary")

exports.getPublicKey = (v) => {
    const public_key = ((v.split("/")).at(-1).split('.'))[0]
    return public_key
}

exports.deleteImage = async (arr) => {

    const publicIDs = arr.map((item) => this.getPublicKey(item))

    const res = await cloudinary.api.delete_resources(publicIDs)

    if(Object.keys(res.deleted).length==publicIDs.length){
        return true
    }
    return false

    
}