import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import * as motoService from '../../services/motoService';

export const EditPage = () => {

    const { motoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        motoService.getOneMoto(motoId)
            .then(motoData => {
                formik.setValues({
                    model: motoData.model || '',
                    imageUrl: motoData.imageUrl || '',
                    year: motoData.year || '',
                    mileage: motoData.mileage || '',
                    contact: motoData.contact || '',
                    about: motoData.about || '',
                })
            })
    }, [motoId]);

    const handleEditMoto = (motoData) => {

        try {
            motoService.editMoto(motoId, motoData);

            navigate(`/details-page/${motoId}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const initialValues = {
        model: '',
        imageUrl: '',
        year: '',
        mileage: '',
        contact: '',
        about: '',
    }

    const onSubmit = (values) => {
        handleEditMoto(values)
    }

    const validate = (values) => {
        const errors = {};

        if (!values.model) {
            errors.model = 'Model is required!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required!'
        }

        if (!values.year) {
            errors.year = 'Year is required!'
        } else if (values.year < 1821) {
            errors.year = 'The first motor is created in 1821'
        }

        if (!values.mileage) {
            errors.mileage = 'Mileage is required!'
        } else if (values.mileage < 0) {
            errors.mileage = 'Mileage cannot be negative number!'
        }

        if (!values.contact) {
            errors.contact = 'Contact is required!'
        } else if (values.contact < 0) {
            errors.contact = 'Contact cannot be negative number!'
        } else if (!/^08\d{8}$/.test(values.contact)) {
            errors.contact = 'Contact must start with "08" followed by 8 digits!';
        }

        if (!values.about) {
            errors.about = 'About is required!'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div className="form">
                <h2>Edit Motorcycle</h2>
                <form className="edit-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="model"
                        id="model"
                        placeholder="Model"
                        value={formik.values.model}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.model && formik.errors.model ? <span className='errors-form'>{formik.errors.model}</span> : null}
                    <input
                        type="text"
                        name="imageUrl"
                        id="moto-image"
                        placeholder="Moto Image"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}
                    <input
                        type="number"
                        name="year"
                        id="year"
                        placeholder="Year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.year && formik.errors.year ? <span className='errors-form'>{formik.errors.year}</span> : null}
                    <input
                        type="number"
                        name="mileage"
                        id="mileage"
                        placeholder="mileage"
                        value={formik.values.mileage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.mileage && formik.errors.mileage ? <span className='errors-form'>{formik.errors.mileage}</span> : null}
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="contact"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.contact && formik.errors.contact ? <span className='errors-form'>{formik.errors.contact}</span> : null}
                    <textarea
                        id="about"
                        name="about"
                        placeholder="about"
                        rows="10"
                        cols="50"
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.about && formik.errors.about ? <span className='errors-form'>{formik.errors.about}</span> : null}
                    <button type="submit">Edit Motorcycle</button>
                </form>
            </div>
        </section>
    )
}