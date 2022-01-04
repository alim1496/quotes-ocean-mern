import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/api";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = () => {
        axios
            .get("/api/categories", config)
            .then(({ data }) => {
                setCategories(data);
            });
    };

    const postCategory = (e) => {
        if (!name) return;
        const { target } = e;
        const data = { name };
        if (weight) data.weight = weight;
        target.classList.add("loading");
        axios
            .post("/api/categories", data, config)
            .then(() => {
                target.classList.remove("loading");
                setName("");
                setWeight("");
                setCategories([]);
                fetchCategory();
            })
            .catch(error => {
                alert(error);
                target.classList.remove("loading");
            });
    };

    return (
        <div className="container grid-lg common-margin">
            <h3>Categories</h3>
            <form className="form-horizontal">
                <div className="form-group my-2">
                    <div class="col-3 col-sm-12 mr-2">
                        <input type="text" placeholder="Enter name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div class="col-3 col-sm-12 mr-2">
                        <input type="number" placeholder="Enter weight" className="form-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div class="col-3 col-sm-12">
                        <button type="button" className="btn btn-primary" onClick={postCategory}>Add Category</button>
                    </div>         
                </div>
            </form>
            <br />
            <div className="common-list">
                {categories && categories.map((category, index) => (
                    <div key={index} className="card max-200 mr-2 mt-2">
                        <div className="card-header">
                            <div className="card-title">{category.name}</div>
                            <div className="card-subtitle">{category.weight}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
