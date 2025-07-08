exports.getPublicKey=(v)=>{
    const public_key=((v.split("/")).at(-1).split('.'))[0]
    return public_key
}