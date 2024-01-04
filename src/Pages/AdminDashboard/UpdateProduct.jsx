import React , { useEffect, useState } from 'react'
import styles from "./UpdateProduct.module.css"
import SideBar from './SideBar'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct, updateProduct } from '../../Redux/ProductReducer/action'
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_PRODUCT_SUCCESS } from '../../Redux/ProductReducer/actionTypes'
import Loader from '../../components/Loader/Loader'
import MetaData from '../../components/MetaData/MetaData'

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const { isLoading, singleProduct } = useSelector((state) => state.ProductReducer);
    const {token} = useSelector((state)=>state.AuthReducer);
    const [name, setName] = useState(singleProduct.name);
    const [price, setPrice] = useState(singleProduct.price);
    const [description, setDescription] = useState(singleProduct.description);
    const [category, setCategory] = useState(singleProduct.category);
    const [stock, setStock] = useState(singleProduct.stocks);
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages,setOldImages] = useState([]);
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
console.log("id",id)
    useEffect(()=>{
   
           if(singleProduct && singleProduct._id !== id){
            dispatch(getSingleProduct(id))
           }
           else{
            setName(singleProduct.name);
            setDescription(singleProduct.description);
            setPrice(singleProduct.price);
            setCategory(singleProduct.category);
            setStock(singleProduct.stocks);
            setOldImages(singleProduct.images);
           }
        
    },[dispatch,id,singleProduct])
    console.log("singleProduct",singleProduct)
    const updateProductSubmitHandler = (e)=>{
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
            dispatch(updateProduct(id,myForm,token)).then((res)=>{
                if(res === UPDATE_PRODUCT_SUCCESS){
                   navigate("/admin/dashboard",{replace:true})
                }
            })
    }
    const updateProductImagesChange =(e)=>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([])
        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload= ()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    }
  return (
    <>
    <MetaData title={"Update product"} />
    <div className={styles.dashboard}>
        <SideBar />
       {isLoading?(<Loader />):( <div className={styles.newProductContainer}>
            <form
                className={styles.createProductForm}
                encType='multipart/form-data'
                onSubmit={updateProductSubmitHandler}
            >
                <h1>Create Product</h1>
                <div>
                    <Spellcheck />
                    <input type="text"
                        placeholder='Product Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <AttachMoney />
                    <input type="number"
                        placeholder='Product Price'
                        required
                        value={price}
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
                        value={description}
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
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div id="createProductFormFile" className={styles.createProductFormFile}>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                    />
                </div>
                <div id="createProductFormImage" className={styles.createProductFormImage}>
                    {oldImages && oldImages.map((image, index) => (
                        <img key={index} src={image.url} alt="Product Preview" />
                    ))}
                </div>
                <div id="createProductFormImage" className={styles.createProductFormImage}>
                    {imagesPreview && imagesPreview.map((image, index) => (
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
        </div>)}
    </div>
</>
  )
}

export default UpdateProduct
