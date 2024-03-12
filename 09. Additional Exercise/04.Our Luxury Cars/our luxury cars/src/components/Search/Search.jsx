import { useState } from "react";
import { useFormik } from 'formik';

import * as carService from '../../services/carService';
import { CarItem } from "./CarItem/CarItem";

export const Search = () => {

    const [cars, setCars] = useState([]);

    const onSearchHandler = (query) => {
        carService.searchCars(query.search)
            .then(carsData => {
                console.log(carsData);
                setCars(carsData);
            })
            .catch(error => console.log(error));
    }

    const initialValues = {
        search: '',
    }

    const onSubmit = (values) => {
        onSearchHandler(values);
    }

    const validate = (values) => {
        const errors = {};

        if (!values.search) {
            errors.search = 'Search field is required!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <section id="search">
            <div className="form">
                <h4>Search</h4>
                <form className="search-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        id="search-input"
                        value={formik.values.search}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <button type="submit" className="button-list">Search</button>
                </form>
                {formik.touched.search && formik.errors.search ? <span className="errors-form">{formik.errors.search}</span> : null}
            </div>
            <div className="search-result">

                {cars.length === 0
                    ? <h2 className="no-avaliable">No result.</h2>
                    : cars.map(car => <CarItem key={car._id} car={car} />)
                }
            </div>
        </section>
    )
}