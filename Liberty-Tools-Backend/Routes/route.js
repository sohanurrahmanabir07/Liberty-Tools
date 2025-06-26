const express = require('express')
const { getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct, updateCategory, downloadPdfFiles, getLogo, pdfUpload, uploadBanner, getBanners, deleteBanner, AddBlog, getBlogs, deleteBlog } = require('../Controller/Controller')
const { register, login } = require('../Controller/AuthController')
const router = express.Router()
const multer = require('multer')
const { uploadLogo, getQueries, UploadPdf } = require('../Controller/AdminController')

const upload = multer({ dest: 'uploads/' })

// __________Api testing Route______________
router.get('/', (req, res) => {
    res.send('The Server Is Working')
})
// _________API testing Route___________


router.get('/getProducts', getProducts)
router.get('/getCategories', getCategories)
router.get('/getLogo', getLogo)
router.get('/getBanners', getBanners)

// _________Admin route________________
router.post('/register', register)
router.post('/login', login)
// router.post('/addProduct', upload.array('images', 5), addProduct);


// router.post('/addProduct', upload.fields([
//     { name: 'images', maxCount: 5 },
//     { name: 'pdf', maxCount: 1 }
// ]), addProduct);



router.post('/addProduct', upload.any(), addProduct);


router.put('/updateProduct/:id', upload.any(), updateProduct)


router.delete('/deleteProduct', deleteProduct)
router.delete('/deleteBlog', deleteBlog)
router.post('/addCategory', upload.fields([
    { name: 'image' },
    { name: 'bannerImage' }
]), addCategory)
router.delete('/deleteCategory', deleteCategory)
router.delete('/deleteBanner', deleteBanner)
router.put('/updateCategory/:id', upload.fields([
    { name: 'image' },
    { name: 'bannerImage' }
]), updateCategory)
router.get('/download/:fileId', downloadPdfFiles)
router.get('/getQueries', getQueries)
router.post('/upload-pdf', UploadPdf)

router.post('/pdf', upload.single('pdf'), pdfUpload)
router.post('/uploadBanner', upload.array('images', 10), uploadBanner)
router.post('/addBlog',upload.fields([
    {name:'images'}
]),AddBlog)
router.post('/logoUpload', upload.array('images', 5), uploadLogo)
router.get('/getBlogs',getBlogs)
module.exports = {
    router
}