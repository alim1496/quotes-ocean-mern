import React, { useState } from "react";
import axios from "axios";
import { config } from "../utils/api";

const Quotes = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState({ name: "" });
    const [category, setCategory] = useState("");
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        axios.get("/api/categories", config).then(({ data }) => {
            setCategories(data);
        })
    };

    const fetchAuthors = () => {};

    const addQuote = () => {
        console.log(status);
        console.log(category);
    };

    return (
        <div className="container grid-lg common-margin">
            <h3>Quotes</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="quote-title" className="form-label">Title</label>
                    <input type="text" placeholder="Man is mortal" id="quote-title" className="form-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="quote-author" className="form-label">Author</label>
                    <input type="text" placeholder="Socrates" id="quote-author" className="form-input" value={author.name} />
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="quote-category" className="form-label">Category</label>
                    <select className="form-select" onClick={fetchCategories} onChange={(e) => setCategory(e.target.value)} value={category}>
                        {categories && categories.map((_category, index) => (
                            <option key={index} value={_category._id}>{_category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label className="form-label">Status</label>
                    <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Published">Published</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="form-group my-2">
                    <label className="form-checkbox">
                        <input className="checkbox" checked={featured} type="checkbox" onChange={(e) => setFeatured(e.target.checked)} />
                        <i className="form-icon"/> Featured
                    </label>
                </div>
                {loading ? <div className="loading my-2 w-100"></div> : <input type="submit" value="Add Quote" className="btn btn-primary my-2" onClick={addQuote} />}
            </form>
        </div>
    );
};

export default Quotes;
