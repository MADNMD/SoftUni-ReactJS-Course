import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as carService from '../../services/carService';

export const EditPage = () => {

    const [car, setCar] = useState({});
    const { carId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        carService.getOneCar(carId)
            .then(carData => {
                setCar(carData);
                formik.setValues({
                    model: carData.model || '',
                    imageUrl: carData.imageUrl || '',
                    price: carData.price || '',
                    weight: carData.weight || '',
                    speed: carData.speed || '',
                    about: carData.about || '',
                })
            })
            .catch(error => console.log(error));
    }, [carId]);

    const onEditSubmitHandler = (carData) => {
        carService.editCar(carId, carData)
            .then(() => {
                navigate(`/details-page/${carId}`);
            })
            .catch(error => console.log(error));
    }

    const initialValues = {
        model: '',
        imageUrl: '',
        price: '',
        weight: '',
        speed: '',
        about: '',
    }

    const onSubmit = (values) => {
        onEditSubmitHandler(values);
    }

    const validate = (values) => {
        const errors = {}

        if (!values.model) {
            errors.model = 'Model is rquired!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required!'
        }

        if (!values.price) {
            errors.price = 'Price is rquired!'
        }

        if (!values.weight) {
            errors.weight = 'Weight is rquired!'
        } else if (Number(values.weight) < 0) {
            errors.weight = 'Should be positive number!'
        }

        if (!values.speed) {
            errors.speed = 'Speed is required!'
        }

        if (!values.about) {
            errors.about = 'About is required!'
        }
        return errors;
    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <section id="edit">
            <div className="form form-auto">
                <h2>Edit Your Car</h2>
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
                        id="car-image"
                        placeholder="Your Car Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}
                    <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Price in Euro"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? <span className='errors-form'>{formik.errors.price}</span> : null}
                    <input
                        type="number"
                        name="weight"
                        id="weight"
                        placeholder="Weight in Kg"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.weight && formik.errors.weight ? <span className='errors-form'>{formik.errors.weight}</span> : null}
                    <input
                        type="text"
                        name="speed"
                        id="speed"
                        placeholder="Top Speed in Kmh"
                        value={formik.values.speed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.speed && formik.errors.speed ? <span className='errors-form'>{formik.errors.speed}</span> : null}
                    <textarea
                        id="about"
                        name="about"
                        placeholder="More About The Car"
                        rows="10"
                        cols="50"
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.about && formik.errors.about ? <span className='errors-form'>{formik.errors.about}</span> : null}
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    )
}