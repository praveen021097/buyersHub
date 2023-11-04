import React, { useState } from 'react'
import styles from "./NewProduct.module.css"
import SideBar from './SideBar'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createNewProduct } from '../../Redux/ProductReducer/action'
import { CREATE_NEW_PRODUCT_SUCCESS } from '../../Redux/ProductReducer/actionTypes'
import { useNavigate } from 'react-router-dom'
const NewProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, isCreated } = useSelector((state) => state.ProductReducer);
    const {token} = useSelector((state)=>state.AuthReducer);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const navigate = useNavigate();
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    const createProductSubmitHandler = (e)=>{
            e.preventDefault();
            const myForm = new FormData();

            myForm.set("name",name);
            myForm.set("price",price);
            myForm.set("description",description);
            myForm.set("category",category);
            myForm.set("stocks",stock);
            images.forEach((image)=>{
                myForm.set("images",image)
    })

    console.log("myform",name,price,description,category,stock,images)
            dispatch(createNewProduct(myForm,token)).then((res)=>{
                if(res === CREATE_NEW_PRODUCT_SUCCESS){
                   navigate("/admin/dashboard",{replace:true})
                }
            })
    }
    const createProductImagesChange =(e)=>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload= ()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    }
    return (
        <>
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.newProductContainer}>
                    <form
                        className={styles.createProductForm}
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <Spellcheck />
                            <input type="text"
                                placeholder='Product Name'
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input type="number"
                                placeholder='Product Price'
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea type="text"
                                placeholder='Product Description'
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                cols={"30"}
                                rows={"1"}
                            ></textarea>
                        </div>
                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile" className={styles.createProductFormFile}>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage" className={styles.createProductFormImage}>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        <Button
                            id="createProductBtn"
                            className={styles.createProductBtn}
                            type="submit"
                            disabled={isLoading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct
