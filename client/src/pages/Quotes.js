import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiTick, TiTimes, TiEdit, TiDelete } from "react-icons/ti";
import { config } from "../utils/api";

const Quotes = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = () => {
        axios.get("/api/quotes", config).then(({ data }) => {
            setQuotes(data);
        });
    };

    const fetchCategories = () => {
        axios.get("/api/categories", config).then(({ data }) => {
            setCategories(data);
        })
    };

    const searchAuthor = (e) => {
        const {
            target: { value },
          } = e;
          if (value.length < 3) return;
      
          setOptions([]);
          axios
            .get(
              `/api/authors/find/author/?name=${value}`,
              config
            )
            .then(({ data: { result } }) => setOptions(result));
    };

    const setAuthorOption = (e, option) => {
        e.preventDefault();
        document.querySelector("#quote-author").value = option.name;
        setAuthor(option._id);
        setOptions([]);
    };

    const deleteQuote = (id) => {
        axios.delete(`/api/quotes/${id}`, config).then(() => fetchQuotes()).catch(err => alert(err));
    };

    const addQuote = () => {
        const data = {
            title,
            featured,
            status,
            category,
            author
        };
        setLoading(true);
        axios.post("/api/quotes", data, config).then(() => {
            setLoading(false);
            setTitle("");
            setStatus("");
            setFeatured(false);
            setCategory("");
            document.querySelector("#quote-author").value = "";
            document.querySelector("#quote-category").value = "";
            document.querySelector("#quote-status").value = "";
            fetchQuotes();
        }).catch((error) => {
            setLoading(false);
            alert(error);
        });
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
                    <input type="text" placeholder="Socrates" id="quote-author" className="form-input" onChange={searchAuthor} />
                </div>
                <div className="col-10 col-sm-12 col-ml-auto d-flex">
                    {options.length > 0 &&
                        options.map((option, index) => {
                        return (
                            <span
                                className="chip c-hand"
                                key={index}
                                onClick={(e) => setAuthorOption(e, option)}
                            >
                                {option.name}
                            </span>
                        );
                    })}
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label htmlFor="quote-category" className="form-label">Category</label>
                    <select className="form-select" id="quote-category" onClick={fetchCategories} onChange={(e) => setCategory(e.target.value)} value={category}>
                        {categories && categories.map((_category, index) => (
                            <option key={index} value={_category._id}>{_category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-8 col-sm-12">
                    <label className="form-label" htmlFor="quote-status">Status</label>
                    <select className="form-select" id="quote-status" onChange={(e) => setStatus(e.target.value)}>
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
            <br />
            {quotes && (
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                    {quotes.map((quote, index) => (
                        <tr key={index}>
                            <td>{quote.title}</td>
                            <td>{quote.author.name}</td>
                            <td>{quote.category.name}</td>
                            <td>{quote.featured ? <TiTick /> : <TiTimes />}</td>
                            <td>
                                <TiEdit />
                                <TiDelete onClick={() => deleteQuote(quote._id)} />
                            </td>
                        </tr>
                    ))}
                </table>
            )}
        </div>
    );
};

export default Quotes;
