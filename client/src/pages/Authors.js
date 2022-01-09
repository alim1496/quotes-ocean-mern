import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiEdit, TiDelete } from "react-icons/ti";
import { config } from "../utils/api";

const Authors = () => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [intro, setIntro] = useState("");
    const [featured, setFeatured] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = () => {
        axios
            .get("/api/authors", config)
            .then(({ data }) => {
                setAuthors(data);
            })
            .catch(() => {

            });
    };

    const deleteAuthor = (id) => {
        axios.delete(`/api/authors/${id}`, config).then(() => fetchAuthors()).catch(err => alert(err));
    };

    const addAuthor = (e) => {
        if(!name || !desc || !intro || !desc) return;
        const data = {
            name,
            featured,
            description: desc,
            shortIntro: intro
        };
        
        if(url) data.image = url;
        setLoading(true);
        axios
            .post("/api/authors", data, config)
            .then(() => {
                setLoading(false);
                setName("");
                setUrl("");
                setFeatured(false);
                setDesc("");
                setIntro("");
                fetchAuthors();
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });

    };

    return (
        <div className="container grid-lg common-margin">
            <h3>Authors</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="author-name" className="form-label">Name</label>
                    <input type="text" placeholder="John Doe" id="author-name" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="author-img-url" className="form-label">Image URL</label>
                    <input type="text" placeholder="https://example.com" id="author-img-url" className="form-input" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="author-intro" className="form-label">Short Intro</label>
                    <input type="text" placeholder="Writer, Poet, Scholar" id="author-intro" className="form-input" required value={intro} onChange={(e) => setIntro(e.target.value)} />
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label className="form-label" for="author-desc">Description</label>
                    <textarea className="form-input" id="author-desc" placeholder="Author description here..." rows="7" required value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-checkbox">
                        <input className="checkbox" checked={featured} type="checkbox" onChange={(e) => setFeatured(e.target.checked)} />
                        <i className="form-icon"/> Featured
                    </label>
                </div>
                {loading ? <div className="loading my-2 w-100"></div> : <input type="submit" value="Add Author" className="btn btn-primary my-2" onClick={addAuthor} />}
            </form>
            <br />
            <div className="common-list">
                {authors && authors.map((author, index) => (
                    <div key={index} className="author-card max-200 mr-2 mt-2">
                        <img src={author.image} alt="author" className="img-round" />
                        <div className="author-name mt-2">{author.name}</div>
                        <div className="d-flex">
                            <TiEdit />
                            <TiDelete onClick={() => deleteAuthor(author._id)} />
                        </div>                    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Authors;
