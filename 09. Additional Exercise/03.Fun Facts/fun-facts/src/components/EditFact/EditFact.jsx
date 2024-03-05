import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik';

import * as factService from '../../services/factService';

export const EditFact = () => {

    const [fact, setFact] = useState({});
    const { factId } = useParams();
    const navigate = useNavigate();


    const initialValues = {
        category: '',
        imageUrl: '',
        description: '',
        moreInfo: '',
    }
    const onSubmit = (values) => {
        onHandleEdit(values);
    }

    const validate = (values) => {
        const errors = {}

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
            errors.moreInfo = 'Additional info is required!'
        }
        return errors;
    }

    const fomrik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    useEffect(() => {
        factService.getOnfact(factId)
            .then(fact => {
                setFact(fact)
                fomrik.setValues({
                    category: fact.category || '',
                    imageUrl: fact.imageUrl || '',
                    description: fact.description || '',
                    moreInfo: fact.moreInfo || ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [factId]);

    const onHandleEdit = (factData) => {
        factService.editFact(factId, factData)
            .then(() => {
                navigate(`/details-fact/${factId}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section id="edit">
            <div className="form">
                <h2>Edit Fact</h2>
                <form className="edit-form" onSubmit={fomrik.handleSubmit}>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                        value={fomrik.values.category}
                        onChange={fomrik.handleChange}
                        onBlur={fomrik.handleBlur}
                    />
                    {fomrik.touched.category && fomrik.errors.category ? <span className="errors-form">{fomrik.errors.category}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="image-url"
                        placeholder="Image URL"
                        value={fomrik.values.imageUrl}
                        onChange={fomrik.handleChange}
                        onBlur={fomrik.handleBlur}
                    />
                    {fomrik.touched.imageUrl && fomrik.errors.imageUrl ? <span className="errors-form">{fomrik.errors.imageUrl}</span> : null}
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                        value={fomrik.values.description}
                        onChange={fomrik.handleChange}
                        onBlur={fomrik.handleBlur}
                    ></textarea>
                    {fomrik.touched.description && fomrik.errors.description ? <span className="errors-form">{fomrik.errors.description}</span> : null}
                    <textarea
                        id="additional-info"
                        name="moreInfo"
                        placeholder="Additional Info"
                        rows="10"
                        cols="50"
                        value={fomrik.values.moreInfo}
                        onChange={fomrik.handleChange}
                        onBlur={fomrik.handleBlur}
                    ></textarea>
                    {fomrik.touched.moreInfo && fomrik.errors.moreInfo ? <span className="errors-form">{fomrik.errors.moreInfo}</span> : null}
                    <button type="submit">Post</button>
                </form>
            </div>
        </section>
    )
}