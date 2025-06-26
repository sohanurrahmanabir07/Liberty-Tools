import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';

export const AddService = () => {
    const [images, setImages] = useState([]);
    const [pdfFile, setPdfFile] = useState(null); // ✅ Added for PDF
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [parameter, setParameter] = useState([{ key: '', value: '' }]);
    const [packingData, setPacking_Data] = useState([{ key: '', value: '' }]);
    const [loading, setLoading] = useState(false);

    const { setCategories, categories, products, setProducts } = useOutletContext();
    const fileInputRef = useRef();
    const pdfInputRef = useRef(); // ✅ PDF ref to reset later

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleParameter = (index, field, value) => {
        const newParameter = [...parameter];
        newParameter[index][field] = value;
        setParameter(newParameter);
    };
    const handlePackingData = (index, field, value) => {
        const newPackingData = [...packingData];
        newPackingData[index][field] = value;
        setPacking_Data(newPackingData);
    };

    const addSpecField = (v) => {
        if (v == 'parameter') {
            setParameter([...parameter, { key: '', value: '' }]);
        } else {
            setPacking_Data([...packingData, { key: '', value: '' }]);
        }



    }
    const removeSpecField = (index, v) => {
        if (v == 'parameter') {
            setParameter(parameter.filter((_, i) => i !== index));
        }else{
            setPacking_Data(packingData.filter((_, i) => i !== index));
        }



    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length || !model || !description || !category || !parameter) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }

        const formData = new FormData();
        images.forEach((img) => formData.append('images', img)); // 🔥 Key must match multer config

        if (pdfFile) {
            formData.append('pdf', pdfFile); // ✅ Key matches multer field
        }

        const transformedParameter = parameter.map(({ key, value }) => ({ [key]: value }));
        const transformedPackingData = packingData.map(({ key, value }) => ({ [key]: value }));

        const info = {
            name,
            model,
            description,
            category,
            parameter: transformedParameter,
            packingData:transformedPackingData
        };

        formData.append('info', JSON.stringify(info));

        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addProduct`, formData);

            if (res.status === 200) {
                setProducts(res.data.data);
                Swal.fire({ icon: "success", title: "Uploaded Successfully" });
            }

            // Reset
            setImages([]);
            setPdfFile(null);
            setName('');
            setModel('');
            setDescription('');
            setCategory('');
            setParameter([{ key: '', value: '' }]);
            setPacking_Data([{ key: '', value: '' }]);
            fileInputRef.current.value = null;
            if (pdfInputRef.current) pdfInputRef.current.value = null;

        } catch (err) {
            Swal.fire({ icon: "error", title: "Error uploading", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="checkbox" id="AddService" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="AddService" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                    <section className='space-y-4'>
                        <div className='space-y-4'>
                            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Model Name' />
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Product Name' />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Description' />

                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='border-2 border-gray-300 p-2 w-full'>
                                <option disabled value=''>Select Category</option>
                                {categories && categories.map((item, index) => (
                                    <option key={index} value={item.name}>{capitalizeWords(item.name)}</option>
                                ))}
                            </select>


                            <div className='space-y-2'>
                                <p>Add <span className='font-semibold'>Parameter</span> Info:</p>
                                {parameter.map((spec, index) => (
                                    <div key={index} className='flex space-x-3 items-center'>
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handleParameter(index, 'key', e.target.value)}
                                            className='border-2 w-[170px] border-gray-300 p-2'
                                            placeholder='Spec name'
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleParameter(index, 'value', e.target.value)}
                                            className='border-2 w-[170px] border-gray-300 p-2'
                                            placeholder='Spec value'
                                        />
                                        <button type='button' className='btn btn-sm btn-primary' onClick={()=>addSpecField('parameter')}>+</button>
                                        <button type='button' className='btn btn-sm btn-error' onClick={() => removeSpecField(index,'parameter')}>−</button>
                                    </div>
                                ))}

                            </div>

                            <div className='space-y-2'>
                                <p>Add <span className='font-semibold'>Packing Data</span>  Info:</p>
                                {packingData.map((spec, index) => (
                                    <div key={index} className='flex space-x-3 items-center'>
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handlePackingData(index, 'key', e.target.value)}
                                            className='border-2 w-[170px] border-gray-300 p-2'
                                            placeholder='Spec name'
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handlePackingData(index, 'value', e.target.value)}
                                            className='border-2 w-[170px] border-gray-300 p-2'
                                            placeholder='Spec value'
                                        />
                                        <button type='button' className='btn btn-sm btn-primary' onClick={()=>addSpecField('packing data')}>+</button>
                                        <button type='button' className='btn btn-sm btn-error' onClick={() => removeSpecField(index,'packing data')}>−</button>
                                    </div>
                                ))}

                            </div>


                            {/* 🔥 Image Upload Field */}
                            <div className='flex space-x-3'>
                                <p>Upload Images</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className='border-2 border-gray-300 p-2 w-full'
                                    accept="image/*"
                                    multiple
                                />
                            </div>

                            {/* ✅ PDF Upload Field */}
                            <div className='flex space-x-3'>
                                <p>Upload PDF</p>
                                <input
                                    type="file"
                                    ref={pdfInputRef}
                                    onChange={(e) => setPdfFile(e.target.files[0])}
                                    className='border-2 border-gray-300 p-2 w-full'
                                    accept="application/pdf"
                                />
                            </div>
                        </div>

                        <button
                            disabled={(!model || !description || !category || !images.length || loading)}
                            onClick={handleSubmit}
                            className='btn btn-secondary w-full'>
                            Upload {loading && <span className="loading loading-spinner loading-sm"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
