import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import * as factService from '../../services/factService';

export const CreateFact = () => {

    const navigate = useNavigate();

    const handleCreateSubmit = (factData) => {
        factService.createFact(factData)
            .then(() => {
                navigate('/catalog')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const initialValues = {
        category: '',
        imageUrl: '',
        description: '',
        moreInfo: ''
    }

    const onSubmit = (values) => {
        handleCreateSubmit(values)
    }

    const validate = (values) => {
        const errors = {};

        if (!values.category) {
            errors.category = 'Category is required!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required!'
        }

        if (!values.description) {
            errors.description = 'Description is required!'
        }

        if (!values.moreInfo) {
            errors.moreInfo = 'Additional info is rquired!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <section id="create">
            <div className="form">
                <h2>Add Fact</h2>
                <form className="create-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.category && formik.errors.category ? <span className='errors-form'>{formik.errors.category}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="image-url"
                        placeholder="Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}
                    <textarea
                        id="description"
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
                        id="additional-info"
                        name="moreInfo"
                        placeholder="Additional Info"
                        rows="10"
                        cols="50"
                        value={formik.values.moreInfo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.moreInfo && formik.errors.moreInfo ? <span className='errors-form'>{formik.errors.moreInfo}</span> : null}
                    <button type="submit">Add Fact</button>
                </form>
            </div>
        </section>
    )
}