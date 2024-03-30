import { useEffect, useState } from "react";
import { useFormik } from 'formik';

import * as fruitService from '../../services/fruitService';
import { SearchItem } from "./SearchItem/SearchItem";

export const Search = () => {

    const [searchFruit, setSearchFruit] = useState([]);

    const searchFruits = (query) => {

        fruitService.searchFruit(query.search)
            .then(searchData => {
                setSearchFruit(searchData);
            })
            .catch(error => console.log(error));
    }

    const initialValues = {
        search: '',
    }

    const onSubmit = (values) => {
        searchFruits(values);
    }

    const validate = (values) => {
        const errors = {};

        if (!values.search) {
            errors.search = 'Find your fruit!'
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
                <h2>Search</h2>
                <form className="search-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        id="search-input"
                        value={formik.values.search}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.search && formik.errors.search ? <span className="errors-form">{formik.errors.search}</span> : null}
                    <button type="submit" className="button-list">Search</button>
                </form>
            </div>
            <h4>Results:</h4>
            <div className="search-result">
                {searchFruit.length === 0
                    ? <p className="no-result">No result.</p>
                    : searchFruit.map(fruit => <SearchItem key={fruit._id} fruit={fruit} />)
                }

            </div>
        </section>
    )
}