import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';

export const ProductUpdate = ({ item }) => {
    const [images, setImages] = useState([]); // Can be strings (existing URLs) or File objects
    const [pdf, setPdf] = useState(null)
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [specs, setSpecs] = useState([]); // Array of { key, value }

    const [loading, setLoading] = useState(false);
    const { setCategories, categories, products, setProducts } = useOutletContext();
    const fileInputRef = useRef();
    const pdfInputRef = useRef();


    useEffect(() => {
        if (item && item._id) {
            setImages(item.imageUrl || []);
            setName(item.name || '');
            setModel(item.model || '');
            setDescription(item.description || '');
            setCategory(item.category || '');
            setPdf(item.pdf || null)

            // Convert incoming format to {key, value} pair
            const formattedSpecs = Array.isArray(item.techSpec)
                ? item.techSpec.map(obj => {
                    const key = Object.keys(obj)[0];
                    return { key, value: obj[key] };
                })
                : [];
            setSpecs(formattedSpecs);
        }
    }, [item]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...specs];
        updatedSpecs[index][field] = value;
        setSpecs(updatedSpecs); // ensures reactivity and correct data binding
    };

    const addSpecField = () => setSpecs(prev => [...prev, { key: '', value: '' }]);

    const removeSpecField = (index) => setSpecs(prev => prev.filter((_, i) => i !== index));

    const removeImage = (index) => setImages(prev => prev.filter((_, i) => i !== index));



    const handlePdfChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setPdf(selectedFile);
        }
    };

    const handleSubmit = async (e) => {

        if (!images.length || !name || !model || !description || !category || !pdf) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }

        const formData = new FormData();

        // Append images (new and existing URLs)
        images.forEach(img => {
            if (typeof img === 'string') {
                formData.append('existingImages', img);
            } else {
                formData.append('images', img);
            }
        });

        // If a new PDF file is selected (not a URL string)
        if (pdf && typeof pdf !== 'string') {
            formData.append('pdf', pdf);
        }

        // Convert {key, value} → { key: value }
        const transformedSpecs = specs
            .filter(({ key, value }) => key && value)
            .map(({ key, value }) => ({ [key]: value }));

        const info = {
            name,
            model,
            description,
            category,
            techSpec: transformedSpecs,
        };

        // Retain old PDF URL if no new file is selected and existing one exists
        if (pdf && typeof pdf === 'string') {
            info.pdf = pdf;
        }

        formData.append('info', JSON.stringify(info));

        setLoading(true);

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/updateProduct/${item._id}`,
                formData
            );

            if (res.status === 200) {
                setProducts(res.data.data);
                document.getElementById(`ProductUpdate-${item?._id}`).checked = false
                Swal.fire({ icon: "success", title: "Updated Successfully" });

            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.message });
        } finally {
            setLoading(false);
        }
    };


    if (!item) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    const hanldeClose = () => {
        setImages(item.imageUrl || []);
        setName(item.name || '');
        setModel(item.model || '');
        setDescription(item.description || '');
        setCategory(item.category || '');
        setPdf(item.pdf || null)
        setSpecs(item.techSpec);

        document.getElementById(`ProductUpdate-${item?._id}`).checked = false

    }

    return (
        <div>
            <input type="checkbox" id={`ProductUpdate-${item?._id}`} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box relative">
                    <div className="modal-action absolute -top-6 right-4 className='cursor-pointer'" onClick={hanldeClose}>


                        <FontAwesomeIcon icon={faXmark} size='lg' />

                    </div>

                    <section className='space-y-4'>
                        <input value={model} onChange={(e) => setModel(e.target.value)} className='border p-2 w-full' placeholder='Model Name' />
                        <input value={name} onChange={(e) => setName(e.target.value)} className='border p-2 w-full' placeholder='Product Name' />
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='border p-2 w-full' placeholder='Description' />

                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 w-full'>
                            <option disabled value=''>Select Category</option>
                            {categories && categories.map((cat, i) => (
                                <option key={i} value={cat.name}>{capitalizeWords(cat.name)}</option>
                            ))}
                        </select>

                        {/* Tech Specs */}
                        <div className='space-y-2'>
                            {specs.map((spec, i) => (
                                <div key={i} className='flex space-x-2 items-center'>
                                    <input value={spec.key} onChange={(e) => handleSpecChange(i, 'key', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Key' />
                                    <input value={spec.value} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Value' />
                                    <button type="button" onClick={() => removeSpecField(i)} className='btn btn-sm btn-error'>−</button>
                                </div>
                            ))}
                            <button type="button" className='btn btn-sm btn-primary' onClick={addSpecField}>+ Add Spec</button>
                        </div>

                        {/* Image Previews */}
                        <div className="flex flex-wrap gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="relative">
                                    <img loading="lazy" src={typeof img === 'string' ? img : URL.createObjectURL(img)} className="w-24 h-24 object-cover rounded-md shadow" />
                                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => removeImage(i)}>✕</button>
                                </div>
                            ))}
                        </div>

                        {/* File input */}
                        <span>Image</span>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className='border p-2 w-full text-sm  font-light' accept="image/*" multiple />
                        {/* PDF Preview */}
                        {pdf && typeof pdf === 'string' && (
                            <div className='relative w-30'>
                                <div className='px-4 py-2 rounded-md text-white bg-red-400 cursor-pointer'
                                    onClick={() => window.open(pdf, "_blank")}
                                >
                                    <FontAwesomeIcon icon={faFilePdf} size='sm' />
                                    <span className="ml-2">{model || "PDF File"}</span>
                                </div>
                                <button type="button" className="absolute top-0 right-0 hover:text-red-500 text-white rounded-full p-1"
                                    onClick={() => setPdf(null)}>
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* PDF Upload */}

                        <div>
                            <span>Pdf</span>
                            <input
                                type="file"
                                ref={pdfInputRef}
                                onChange={handlePdfChange}
                                className='border p-2 w-full text-sm font-light'
                                accept="application/pdf"
                            />
                        </div>





                        <button onClick={handleSubmit} className='btn btn-secondary w-full'>
                            Update {loading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
