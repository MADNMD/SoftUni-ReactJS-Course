import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as motoService from '../../services/motoService';

export const CreatePage = () => {

    const navigate = useNavigate();

    const createMoto = (motoData) => {

        try {
            motoService.addMoto(motoData);
            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }

    }

    const initialValues = {
        model: '',
        imageUrl: '',
        year: '',
        mileage: '',
        contact: '',
        about: ''
    }

    const onSubmit = (values) => {
        createMoto(values);
    }

    const validate = (values) => {
        const errors = {}

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
        <section id="create">
            <h2>Add Motorcycle</h2>
            <div className="form">
                <h2>Add Motorcycle</h2>
                <form className="create-form" onSubmit={formik.handleSubmit}>
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
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="10"
                        cols="50"
                    ></textarea>
                    {formik.touched.about && formik.errors.about ? <span className='errors-form'>{formik.errors.about}</span> : null}
                    <button type="submit">Add Motorcycle</button>
                </form>
            </div>
        </section>
    )
}