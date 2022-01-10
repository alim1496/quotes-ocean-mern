import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../utils/api";

const Dashboard = () => {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        axios
            .get("/api/quotes/statistics/count", config)
            .then(({ data: { quotes, categories, authors, featured, featuredAuthor, quotesToday, authorsToday }}) => {
                document.querySelector("#quotes-count").innerHTML = quotes;
                document.querySelector("#categories-count").innerHTML = categories;
                document.querySelector("#authors-count").innerHTML = authors;
                document.querySelector("#f-quotes").innerHTML = `Total featured quotes: ${featured}`;
                document.querySelector("#f-authors").innerHTML = `Total featured authors: ${featuredAuthor}`;
                document.querySelector("#f-quotes-today").innerHTML = `Quotes added today: ${quotesToday}`;
                document.querySelector("#f-authors-today").innerHTML = `Authors added today: ${authorsToday}`;
            });
        axios
            .get("/api/quotes//latest/five", config)
            .then(({ data }) => setLatest(data));    
    }, []);

    return (
        <div className="container grid-lg common-margin">
            <h4>Welcome {localStorage.getItem("user")}</h4>
            <p>{new Date().toLocaleString() + ""}</p>
            <div className="d-flex">
                <div className="card max-200 mr-2 mt-2">
                    <div className="card-header">
                        <div className="card-title">Quotes</div>
                        <div id="quotes-count" className="card-subtitle"></div>
                    </div>
                </div>
                <div className="card max-200 mr-2 mt-2">
                    <div className="card-header">
                        <div className="card-title">Authors</div>
                        <div id="authors-count" className="card-subtitle"></div>
                    </div>
                </div>
                <div className="card max-200 mr-2 mt-2">
                    <div className="card-header">
                        <div className="card-title">Categories</div>
                        <div className="card-subtitle" id="categories-count"></div>
                    </div>
                </div>
            </div>
            <br />
            <div id="f-quotes"></div>
            <div id="f-authors"></div>
            <div id="f-quotes-today"></div>
            <div id="f-authors-today"></div>
            <br />
            <h3>Latest Quotes</h3>
            {latest && latest.map((item, index) => (
                <div key={index}>
                    <div className="text-bold mt-2">{item.title}</div>
                    <div>{item.author.name}</div>
                </div>
            ))}
            <br />
        </div>
    );
};

export default Dashboard;
