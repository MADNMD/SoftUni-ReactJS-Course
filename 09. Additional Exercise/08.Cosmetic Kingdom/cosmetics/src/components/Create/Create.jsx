import { useFormik } from 'formik';

import * as cosmeticService from '../../Services/cosmeticService';
import { useNavigate } from 'react-router-dom';

export const Create = () => {

    const navigate = useNavigate()

    const createProduct = (productData) => {
        cosmeticService.addNewProduct(productData)
            .then(() => {
                navigate('/catalog');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const initialValues = {
        name: '',
        imageUrl: '',
        category: '',
        description: '',
        price: '',
    }

    const onSubmit = (values) => {
        createProduct(values);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name is required!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required!'
        } else if (/^https?\/\//.test(values.imageUrl)) {
            errors.imageUrl = 'The product image is required and should start with http:// or https://!'
        }

        if (!values.category) {
            errors.category = 'Category is required!'
        }

        if (!values.description) {
            errors.description = 'Description is required!'
        }

        if (!values.price) {
            errors.price = 'Price is required!'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return (
        <section id="create">
            <div className="form">
                <h2>Add Product</h2>
                <form className="create-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="name" id="name"
                        placeholder="Product Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <span className='errors-form'>{formik.errors.name}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="product-image"
                        placeholder="Product Image"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}
                    <input
                        type="text"
                        name="category"
                        id="product-category"
                        placeholder="Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.category && formik.errors.category ? <span className='errors-form'>{formik.errors.category}</span> : null}
                    <textarea
                        id="product-description"
                        name="description"
                        placeholder="Description" 
                        rows="5"
                        cols="50"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? <span className='errors-form'>{formik.errors.description}</span> : null}
                    <input
                        type="text"
                        name="price"
                        id="product-price"
                        placeholder="Price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? <span className='errors-form'>{formik.errors.price}</span> : null}
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>
    )
}