import { useFormik } from "formik";

import * as characterService from '../../services/characterService';
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {

    const navigate = useNavigate();

    const handleCreateSubmit = (charData) => {
        characterService.createCharacter(charData)
            .then(() => {
                navigate('/catalog');
            })
            .catch(error => {
                console.log(error)
            })
    }

    const initialValues = {
        category: '',
        imageUrl: '',
        description: '',
        moreInfo: ''

    }

    const onSubmit = (values) => {
        handleCreateSubmit(values);
    }

    const validate = (values) => {

        const error = {}

        if (!values.category) {
            error.category = 'Category is required'
        }

        if (!values.imageUrl) {
            error.imageUrl = 'Image URL is reuired'
        }

        if (!values.description) {
            error.description = 'Description is required'
        }

        if (!values.moreInfo) {
            error.moreInfo = 'Additionla info is required'
        }

        return error;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <section id="create">
            <div className="form">
                <img className="border" src="./public/images/border.png" alt="" />
                <h2>Add Character</h2>
                <form className="create-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Character Type"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.category && formik.errors.category ? <span className="errors">{formik.errors.category}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="image-url"
                        placeholder="Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className="errors">{formik.errors.imageUrl}</span> : null}
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        rows="2"
                        cols="10"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? <span className="errors">{formik.errors.description}</span> : null}
                    <textarea
                        id="additional-info"
                        name="moreInfo"
                        placeholder="Additional Info"
                        rows="2"
                        cols="10"
                        value={formik.values.moreInfo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.moreInfo && formik.errors.moreInfo ? <span className="errors">{formik.errors.moreInfo}</span> : null}
                    <button type="submit">Add Character</button>
                </form>
                <img className="border" src="./public/images/border.png" alt="" />
            </div>
        </section>
    )
}