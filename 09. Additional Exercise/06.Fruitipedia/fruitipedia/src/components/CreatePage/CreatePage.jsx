import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as fruitService from '../../services/fruitService';

export const CreatePage = () => {

    const navigate = useNavigate();

    const createFruit = (fruitData) => {

        try {
            fruitService.addFruit(fruitData);
            navigate('/catalog');
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const initialValues = {
        name: '',
        imageUrl: '',
        description: '',
        nutrition: '',
    }

    const onSubmit = (values) => {
        createFruit(values);
    }

    const validate = (values) => {
        const errors = {}

        if (!values.name) {
            errors.name = 'Name is required!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image url is required!'
        } else if (!/^https?:\/\//.test(values.imageUrl)) {
            errors.imageUrl = 'The car image is required and should start with http:// or https://!';
        }

        if (!values.description) {
            errors.description = 'Description is required!'
        }

        if (!values.nutrition) {
            errors.nutrition = 'Nutrition is required!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <section id="create">
            <div className="form">
                <h2>Add Fruit</h2>
                <form className="create-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Fruit Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <span className='errors-form'>{formik.errors.name}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="Fruit-image"
                        placeholder="Fruit Image"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}
                    <textarea
                        id="fruit-description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? <span className='errors-form'>{formik.errors.description}</span> : null}
                    <textarea
                        id="fruit-nutrition"
                        name="nutrition"
                        placeholder="Nutrition"
                        rows="10"
                        cols="50"
                        value={formik.values.nutrition}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.nutrition && formik.errors.nutrition ? <span className='errors-form'>{formik.errors.nutrition}</span> : null}
                    <button type="submit">Add Fruit</button>
                </form>
            </div>
        </section>
    )
}