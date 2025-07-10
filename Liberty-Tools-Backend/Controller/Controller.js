const { mongoose } = require("mongoose")
const { cloudinary } = require("../Cloudinary/cloudinary")

// 
const { Categories } = require("../Model/Categories")
const { Products } = require("../Model/Prodcuts")
const { Logo } = require("../Model/logo")
const { Banners } = require("../Model/Banners")
const { Blogs } = require("../Model/Blogs")
const { Services } = require("../Model/services")
const { Certificates } = require("../Model/certificates")
const { getPublicKey, deleteImage } = require("../Functions/functions")

const getProducts = async (req, res) => {

    try {
        const data = await Products.find({}).sort({ createdAt: 1 }).lean()
        res.send(data)
    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}
const getLogo = async (req, res) => {
    try {

        const logo = await Logo.find({}).sort({ createdAt: -1 }).limit(1)
        if (logo) {
            res.send({
                data: logo[0].imageUrl
            })

        } else {
            res.status(403).send({
                message: 'No Logo Found'
            })
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }
}
const getCategories = async (req, res) => {
    try {

        const data = await Categories.find({}).sort({ createdAt: 1 })
        if (data) {
            res.send(data)
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}
const getCertificate = async (req, res) => {
    try {

        const data = await Certificates.find({}).lean()
        if (data) {
            res.send({
                data: data
            })
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}

const businessProducts = async (req, res) => {
    try {
        // This requires MongoDB 4.4+ for $lookup with pipeline and $mergeObjects

        const result = await Categories.aggregate([
            { $sort: { createdAt: 1 } }, // oldest categories first
            {
                $lookup: {
                    from: "products",
                    let: { categoryName: "$name", categoryCreatedAt: "$createdAt" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$category", "$$categoryName"] } } },
                        { $sort: { createdAt: -1 } }, // newest product first
                        { $limit: 1 },
                        { $addFields: { categoryCreatedAt: "$$categoryCreatedAt" } }
                    ],
                    as: "latestProduct"
                }
            },
            { $unwind: "$latestProduct" },
            // Optionally project to flatten the structure
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$latestProduct", { categoryCreatedAt: "$createdAt" }]
                    }
                }
            },
            { $sort: { categoryCreatedAt: 1 } } // ensure order by category oldest first
        ]);

        if (result) {
            res.send({
                data: result
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const addProduct = async (req, res) => {



    try {
        const files = req.files; // multer.fields gives an object: { images: [...], pdf: [...] }
        const infoString = req.body.info;

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString);


        const imageFiles = files.filter(f => f.fieldname === 'images');
        const imageUrls = await uploadImages(imageFiles);
        info.imageUrl = imageUrls;
        const pdfFile = files?.pdf?.[0] || null;




        // Handle PDFs
        // Find all fields starting with 'pdf_'
        const pdfFiles = files.filter(f => f.fieldname.startsWith('pdf_'));
        let pdfObject = {};
        for (let pdfFile of pdfFiles) {
            const key = pdfFile.fieldname.replace('pdf_', '');
            const url = await pdfUpload(pdfFile);
            pdfObject[key] = url;
        }
        info.pdf = pdfObject; // Store as an object: { dataSheet: '...', userManual: '...' }

        // Validate before saving
        if (info.name && info.imageUrl.length > 0) {
            const newProduct = new Products(info);
            await newProduct.save();
            console.log('new Product', newProduct);

            const products = await Products.find({}).sort({ createdAt: 1 }).lean();
            return res.status(200).send({
                message: "Product uploaded successfully",
                data: products,
            });
        } else {
            return res.status(400).send({ message: "Product name or images missing" });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).send({ message: error.message });
    }
};



const pdfUpload = async (file) => {

    const uploadToCloudinary = await cloudinary.uploader.upload(file.path, {
        resource_type: 'raw',
        public_id: `pdfs/${Date.now()}-${file.originalname}`,
        format: 'pdf', // force .pdf format
        use_filename: true,
        unique_filename: false
    })



    if (uploadToCloudinary) {

        if (!(uploadToCloudinary.format == 'pdf')) {
            let url = uploadToCloudinary.secure_url
            for (let index = url.length - 1; index >= 0; index--) {
                if (url[index] == '.') {
                    let temp = url.slice(0, index)
                    temp += '.pdf'
                    return temp
                }

            }

        }

        return uploadToCloudinary.secure_url
    } else {
        return null
    }


}
const uploadImages = async (files) => {
    const imageUrls = [];
    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
    }
    return imageUrls;
};

// const addProduct = async (req, res) => {
//     try {
//         const files = req.files;
//         const infoString = req.body.info;

//         if (!infoString) return res.status(400).send({ message: "Missing info data" });

//         const info = JSON.parse(infoString);
//         const imageUrl = [];
//         let pdfId = "";

//         const gfs = getGridFSBucket(); // **Get initialized GridFSBucket**

//         // ✅ Handle image uploads correctly
//         if (files.images) {
//             for (const file of files.images) {
//                 imageUrl.push(`/uploads/${file.filename}`);
//             }
//         }

//         // ✅ Handle PDF upload using GridFS
//         if (files.pdf && files.pdf.length > 0) {
//             const pdfFile = files.pdf[0]; // Since it's an array with 1 element
//             const stream = gfs.openUploadStream(pdfFile.originalname);
//             stream.end(pdfFile.buffer);
//             pdfId = stream.id.toString();
//         }

//         info.imageUrl = imageUrl;
//         info.pdf = pdfId; // Attach PDF GridFS ID to product info

//         const newProduct = new Products(info);
//         await newProduct.save();

//         const products = await Products.find({}).sort({ createdAt: -1 }).lean();
//         return res.status(200).send({
//             message: "Product uploaded successfully!",
//             data: products,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: error.message });
//     }
// };

const downloadPdfFiles = async (req, res) => {
    try {
        const { fileId } = req.params;
        const gfs = getGridFSBucket();

        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: "Invalid file ID format!" });
        }

        // Fetch file metadata from GridFS
        const fileMetadata = await mongoose.connection.db
            .collection("uploads.files")
            .findOne({ _id: new mongoose.Types.ObjectId(fileId) });

        if (!fileMetadata) {
            return res.status(404).json({ message: "File not found." });
        }

        // Set headers BEFORE piping stream
        res.setHeader("Content-Type", fileMetadata.contentType || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${fileMetadata.filename}"`);

        // Open the download stream
        const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        downloadStream.on("error", (err) => {
            console.error("Stream error:", err);
            return res.status(500).json({ message: "Error streaming the file." });
        });

        // Pipe the file to the response
        downloadStream.pipe(res);

    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.hello = (req, res) => {
    res.send('hi')
}

const UploadBlog = () => {
    try {

    } catch (error) {

    }
}


const updateProduct = async (req, res) => {
    try {
        // Multer gives req.files as an array when using .any()
        const files = req.files || [];
        const infoString = req.body.info;

        const existingImages = req.body.existingImages || [];
        const existingPdfsRaw = req.body.existingPdfs || '[]';
        const removedPdfsRaw = req.body.removedPdfs || '[]';

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString);

        // --- Handle Images ---
        // Get new image files
        const imageFiles = files.filter(f => f.fieldname === 'images');
        // Upload new images (implement uploadImages to return array of urls)
        let uploadedImageUrls = [];
        for (const imgFile of imageFiles) {
            const result = await cloudinary.uploader.upload(imgFile.path);
            uploadedImageUrls.push(result.secure_url);
        }

        // Merge with existing (kept) images
        let existingImageArr = [];
        if (typeof existingImages === 'string' && existingImages) {
            existingImageArr = [existingImages];
        } else if (Array.isArray(existingImages)) {
            existingImageArr = existingImages;
        }
        // Final imageUrl array
        info.imageUrl = [...existingImageArr, ...uploadedImageUrls];

        // --- Handle PDFs ---
        // Parse existing/removed PDFs from stringified JSON
        let existingPdfs = [];
        let removedPdfs = [];
        try { existingPdfs = JSON.parse(existingPdfsRaw); } catch { existingPdfs = []; }
        try { removedPdfs = JSON.parse(removedPdfsRaw); } catch { removedPdfs = []; }

        // Build the PDF object: start with retained existing PDFs
        let pdfObject = {};
        existingPdfs.forEach(({ key, url }) => {
            if (key && url && !removedPdfs.includes(key)) pdfObject[key] = url;
        });

        // Find all PDF files from the files array
        const pdfFiles = files.filter(f => f.fieldname.startsWith('pdf_'));
        for (const pdfFile of pdfFiles) {
            const key = pdfFile.fieldname.replace('pdf_', '');
            const url = await pdfUpload(pdfFile); // Make sure pdfUpload returns the file URL
            pdfObject[key] = url;
        }

        // Assign the merged PDF object to info
        // if (Object.keys(pdfObject).length < 1) {
        //     return res.status(401).send({ message: "At least one PDF is required!" });
        // }
        info.pdf = pdfObject;

        // --- Validate ---

        if (!info.name || info.imageUrl.length === 0) {
            return res.status(400).send({ message: "Missing name or images" });
        }

        // --- Update DB ---
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            info,
            { new: true }
        );
        const products = await Products.find({}).sort({ createdAt: -1 }).lean();
        if (updateProduct && products) {
            return res.status(200).send({
                message: "Product updated successfully",
                data: products,
            });
        } else {
            return res.status(400).send({
                message: "Error Updating or Fetching Products",

            });
        }


    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};
const fetchBanner = async () => {
    const banners = await Banners.find({}).sort({ createdAt: -1 }).limit(4).lean()
    return banners
}
const getBanners = async (req, res) => {
    try {
        const banners = await fetchBanner()
        if (banners) {
            res.send({
                data: banners
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}


const uploadBanner = async (req, res) => {

    try {
        const info = JSON.parse(req.body.info)
        const files = req.files
        info.imageUrl = await uploadImages(files)

        console.log('imageUrl', info.imageUrl)

        const newBanner = new Banners(info)

        const result = await newBanner.save()

        if (result) {
            const banners = await fetchBanner()
            if (banners) {
                res.send({
                    message: 'Banner Upload Successfully',
                    data: banners
                })
            }

        }


    } catch (error) {
        console.error('Banner upload error:', error);
        res.status(500).send({
            message: error.message
        })
    }


}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.body

        const result = await Banners.deleteOne({ _id: id })
        if (result) {
            const banners = await fetchBanner()

            res.send({
                message: 'Deleted Successfully',
                data: banners
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const addCategory = async (req, res) => {
    try {

        const files = req.files
        const name = req.body.name

        const search = await Categories.find({ name: name }).lean()
        if (search.length > 0) {
            return res.send({
                'message': 'This Category Exists'
            })

        }

        const data = {
            name,
            imageUrl: '',
            bannerImgUrl: ''
        }
        data.imageUrl = await uploadImages(files.image)
        data.bannerImgUrl = await uploadImages(files.bannerImage)



        const addCategory = new Categories(data)
        console.log(addCategory)
        const result = await addCategory.save()
        const categories = await Categories.find({}).sort({ createdAt: 1 })


        if (result) {
            res.send({
                'message': 'New Categpory Added',
                data: categories

            })
        }

    } catch (error) {
        console.log('err', error.message)
        res.status(500).send({
            'message': error.message
        })
    }
}

const addCertificate = async (req, res) => {
    try {

        const files = req.files
        const name = req.body.name

        const search = await Certificates.find({ name: name }).lean()
        if (search.length > 0) {
            return res.send({
                'message': 'This Certificate Exists'
            })

        }

        const data = {
            name,
            imageUrl: '',

        }
        data.imageUrl = await uploadImages(files.image)




        const addCertificate = new Certificates(data)

        const result = await addCertificate.save()
        const certificates = await Certificates.find({}).sort({ createdAt: -1 })


        if (result) {
            res.send({
                'message': 'New Categpory Added',
                data: certificates

            })
        } else {
            res.status(400).send({
                'message': 'Couldnt Add it',
                data: certificates

            })
        }

    } catch (error) {
        console.log('err', error.message)
        res.status(500).send({
            'message': error.message
        })
    }


}

const deleteCertificate = async (req, res) => {
    try {

        const { id } = req.body


        const search = await Certificates.find({ _id: id }).lean()
        if (search.length > 0) {

            const dlt = await Certificates.deleteOne({ _id: id })
            if (dlt) {
                const data = await Certificates.find({}).lean()
                return res.send({
                    'message': 'Certificate Deleted Successfully',
                    data: data
                })
            } else {
                return res.send({
                    'message': 'Couldnt Delete it'
                })
            }

        }
        return res.send({
            'message': 'Certificate Doesnt Exist'
        })

    } catch (error) {
        res.status(500).send({
            'message': 'Error Deleting Certificates'
        })
    }
}

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.body


        const search = await Categories.find({ _id: id }).lean()
        if (search.length > 0) {

            const dlt = await Categories.deleteOne({ _id: id })
            if (dlt) {
                const data = await Categories.find({}).lean()
                return res.send({
                    'message': 'Category Deleted Successfully',
                    data: data
                })
            } else {
                return res.send({
                    'message': 'Couldnt Delete it'
                })
            }

        }
        return res.send({
            'message': 'Category Doesnt Exist'
        })

    } catch (error) {
        res.status(500).send({
            'message': 'Error Deleting Category'
        })
    }
}
// const updateCategory = async (req, res) => {
//     try {
//         const file = req.file; // multer.single('image') should be used in route
//         const { name } = req.body;

//         if (!name) {
//             return res.status(400).send({ message: "Missing category name" });
//         }

//         let imageUrl = req.body.existingImage; // current image URL (string)

//         // If new file is uploaded, replace the image URL
//         if (file) {
//             const result = await cloudinary.uploader.upload(file.path);
//             imageUrl = result.secure_url;
//         }

//         // Update category
//         const updatedCategory = await Categories.findByIdAndUpdate(
//             req.params.id,
//             { name, imageUrl },
//             { new: true }
//         );

//         if (!updatedCategory) {
//             return res.status(404).send({ message: "Category not found" });
//         }

//         // Fetch updated list
//         const allCategories = await Categories.find({}).sort({ createdAt: -1 }).lean();

//         return res.status(200).send({
//             message: "Category updated successfully",
//             data: allCategories,
//         });
//     } catch (error) {
//         console.error("Update Error:", error);
//         return res.status(500).send({ message: error.message });
//     }
// };
const updateCategory = async (req, res) => {
    try {
        const { name, existingImage, existingBannerImage } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Missing category name" });
        }

        // Prepare new URLs or keep old ones
        let imageUrl = existingImage;
        let bannerImgUrl = existingBannerImage;

        // Handle new image upload
        if (req.files && req.files.image && req.files.image[0]) {
            const result = await cloudinary.uploader.upload(req.files.image[0].path);
            imageUrl = result.secure_url;
        }

        // Handle new banner image upload
        if (req.files && req.files.bannerImage && req.files.bannerImage[0]) {
            const result = await cloudinary.uploader.upload(req.files.bannerImage[0].path);
            bannerImgUrl = result.secure_url;
        }

        // Update category
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { name, imageUrl, bannerImgUrl },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Fetch updated list
        const allCategories = await Categories.find({}).sort({ createdAt: -1 }).lean();

        return res.status(200).send({
            message: "Category updated successfully",
            data: allCategories,
        });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};
const deleteProduct = async (req, res) => {

    const { id } = req.body

    const del = await Products.deleteOne({ _id: id })
    try {
        if (del) {
            const data = await Products.find({}).lean()
            res.status(200).send({
                "message": "Product Deleted Successfully",
                data: data
            })
        } else {
            res.status(403).send({
                "message": "Couldn't Delete it"
            })
        }

    } catch (error) {
        res.send(error.message)
    }

}

const deleteBlog = async (req, res) => {

    const { id } = req.body

    const del = await Blogs.deleteOne({ _id: id })
    try {
        if (del) {
            const data = await Blogs.find({}).lean()
            res.status(200).send({
                "message": "Product Deleted Successfully",
                data: data
            })
        } else {
            res.status(403).send({
                "message": "Couldn't Delete it"
            })
        }

    } catch (error) {
        res.send(error.message)
    }

}
const getBlogs = async (req, res) => {
    try {
        const result = await Blogs.find({}).lean()
        if (result) {
            return res.send({

                'data': result
            })
        }
        return res.status(401).send({
            'message': 'Coulndt find data',
        })
    } catch (error) {

    }
}

const AddBlog = async (req, res) => {
    try {

        const { Info } = req.body
        const info = JSON.parse(Info)

        const files = req.files

        const imageUrl = await uploadImages(files.images)
        info.imageUrl = imageUrl

        const newBlog = new Blogs(info)

        const result = await newBlog.save()

        const AllBlogs = await Blogs.find({}).lean()
        if (result) {
            return res.send({
                'message': 'Uploaded Successfully',
                'data': AllBlogs
            })
        }
        return res.status(401).send({
            'message': 'Uploaded Failed',
            'data': AllBlogs
        })




    } catch (error) {
        return res.status(500).send({
            'message': 'Server Error',

        })
    }
}

const addService = async (req, res) => {




    try {
        const newService = new Services(req.body)
        const result = await newService.save()
        const allService = await Services.find({}).lean()
        if (result && allService) {
            res.send({
                'message': 'Service Added',
                'data': allService
            })
        } else {
            res.satus(401).send({
                'message': 'Error Inserting Data',
                'data': allService
            })
        }
    } catch (error) {
        res.send({
            'message': 'Server Error'
        })
    }
}
const getServices = async (req, res) => {
    try {
        const result = await Services.find({}).lean()
        if (result) {

            res.send({
                'data': result
            })
        } else {
            res.status(401).send({
                'message': 'Cant Get The Data',
            })
        }
    } catch (error) {
        res.status(500).send({
            'message': 'Server Error',
        })
    }
}
const updateService = async (req, res) => {
    try {
        const { id } = req.params
        const update = await Services.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (update) {
            const result = await Services.find({}).lean()
            res.send({
                'message': 'Update Successful',
                'data': result
            })
        } else {
            res.status(401).send({
                'message': 'Cant Update',
            })
        }

    } catch (error) {
        res.status(500).send({
            'message': error.message,
        })
    }
}

const deleteService = async (req, res) => {


    const { id } = req.body

    const data = await Categories.findById(id)
    const deleteImages = await deleteImage(data.imageUrl)
    if (deleteImages) {
        const del = await Services.deleteOne({ _id: id })
        try {
            if (del) {
                const data = await Services.find({}).sort({ createdAt: -1 }).lean()
                res.status(200).send({
                    "message": "Service Deleted Successfully",
                    data: data
                })
            } else {
                res.status(403).send({
                    "message": "Couldn't Delete it"
                })
            }

        } catch (error) {
            res.send(error.message)
        }
    } else {
        res.send({
            "message": "Couldn't Delete all images"
        })
    }


}


module.exports = {
    deleteCertificate, addCertificate, businessProducts, deleteService, updateService, getServices, addService, deleteBlog, getBlogs, AddBlog, deleteBanner, uploadBanner, getBanners, pdfUpload, getLogo, downloadPdfFiles, getProducts, addProduct, deleteProduct, getCategories, getCertificate, addCategory, deleteCategory, updateProduct, updateCategory
}