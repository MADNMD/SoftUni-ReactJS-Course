import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import * as characterService from '../../services/characterService';

export const EditPage = () => {

    const [editHero, setEditHero] = useState({});
    const { charId } = useParams();
    const navigate = useNavigate();

    const initialValues = {
        category: '',
        imageUrl: '',
        description: '',
        moreInfo: '',
    }

    const onSubmit = (charData) => {
        handleEditSubmit(charData);
    }

    const validate = (values) => {
        const errors = {}

        if (!values.category) {
            errors.category = 'Category is required'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required'
        }

        if (!values.description) {
            errors.description = 'Description is required'
        }

        if (!values.moreInfo) {
            errors.moreInfo = 'More info is required'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    useEffect(() => {
        characterService.getOneCharacter(charId)
            .then(heroData => {
                setEditHero(heroData)
                formik.setValues({
                    category: heroData.category || '',
                    imageUrl: heroData.imageUrl || '',
                    description: heroData.description || '',
                    moreInfo: heroData.moreInfo || '',
                })
            })
            .catch(error => {
                console.log(error);
            })
    }, [charId]);

    const handleEditSubmit = (charData) => {
        characterService.editCharacter(charId, charData)
            .then(() => {
                navigate(`/details-page/${charId}`)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section id="edit">
            <div className="form">
                <img className="border" src="./images/border.png" alt="" />
                <h2>Edit Character</h2>
                <form className="edit-form" onSubmit={formik.handleSubmit}>
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
                    <button type="submit">Edit</button>
                </form>
                <img className="border" src="./images/border.png" alt="" />
            </div>
        </section>
    )
}