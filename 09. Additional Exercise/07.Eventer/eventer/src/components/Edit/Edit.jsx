import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import * as eventService from '../../services/eventService';

export const Edit = () => {

    const [event, setEvent] = useState({});
    const { eventId } = useParams();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        imageUrl: '',
        category: '',
        description: '',
        date: ''
    }

    const onSubmit = (values) => {
        handleEditSubmit(values);
    }

    const validate = (values) => {
        const errors = {}

        if (!values.name) {
            errors.name = 'Name is required!'
        }

        if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required!'
        } else if (!/^https?:\/\//.test(values.imageUrl)) {
            errors.imageUrl = 'The event image is required and should start with http:// or https://!'
        }

        if (!values.category) {
            errors.category = 'Category is required!'
        }

        if (!values.description) {
            errors.description = 'Description is required!'
        }

        if (!values.date) {
            errors.date = 'Date is required!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    useEffect(() => {
        eventService.getOneEvent(eventId)
            .then(eventData => {
                setEvent(eventData)
                formik.setValues({
                    name: eventData.name || '',
                    imageUrl: eventData.imageUrl || '',
                    category: eventData.category || '',
                    description: eventData.description || '',
                    date: eventData.date || ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [eventId]);

    const handleEditSubmit = (eventData) => {
        eventService.editEvent(eventData, eventId)
            .then(() => {
                navigate(`/details/${eventId}`)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section id="edit">
            <div className="form">
                <h2>Edit Event</h2>
                <form className="edit-form" onSubmit={formik.handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Event"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <span className='errors-form'>{formik.errors.name}</span> : null}

                    <input
                        type="text"
                        name="imageUrl"
                        id="event-image"
                        placeholder="Event Image"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <span className='errors-form'>{formik.errors.imageUrl}</span> : null}

                    <input
                        type="text"
                        name="category"
                        id="event-category"
                        placeholder="Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.category && formik.errors.category ? <span className='errors-form'>{formik.errors.category}</span> : null}

                    <textarea
                        id="event-description"
                        name="description"
                        placeholder="Description"
                        rows="5"
                        cols="50"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? <span className='errors-form'>{formik.errors.description}</span> : null}

                    <label htmlFor="date-and-time">Event Time:</label>
                    <input
                        type="text"
                        name="date"
                        id="date"
                        placeholder="When?"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date ? <span className='errors-form'>{formik.errors.date}</span> : null}

                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    )
}