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
    const [prevQuote, setPrevQuote] = useState({});
    const [editID, setEditID] = useState("");

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = () => {
        axios.get("/api/quotes", config).then(({ data }) => {
            setQuotes(data);
        });
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

    const searchCategory = (e) => {
        const {
            target: { value },
          } = e;
          if (value.length < 3) return;
      
          setCategories([]);
          axios
            .get(
              `/api/categories/find/category/?name=${value}`,
              config
            )
            .then(({ data: { result } }) => setCategories(result));
    };

    const setAuthorOption = (e, option) => {
        e.preventDefault();
        document.querySelector("#quote-author").value = option.name;
        setAuthor(option._id);
        setOptions([]);
    };

    const setCategoryOption = (e, option) => {
        e.preventDefault();
        document.querySelector("#quote-category").value = option.name;
        setCategory(option._id);
        setCategories([]);
    };

    const deleteQuote = (id) => {
        axios.delete(`/api/quotes/${id}`, config).then(() => fetchQuotes()).catch(err => alert(err));
    };

    const editQuote = (id) => {
        axios.get(`/api/quotes/${id}`, config).then(({ data }) => {
            const { title, featured, status, category, author } = data;
            setEditID(id);
            setPrevQuote(data);
            setTitle(title);
            setStatus(status);
            setFeatured(featured);
            setCategory(category._id);
            setAuthor(author._id);
            document.querySelector("#quote-author").value = author.name;
            document.querySelector("#quote-category").value = category.name;
            document.querySelector("#quote-status").value = status;
        });
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
        axios.post("/api/quotes", data, config).then(({ data: { message } }) => {
            showMsg(message);
            setLoading(false);
            cancelAll();
            fetchQuotes();
        }).catch((error) => {
            setLoading(false);
            alert(error);
        });
    };

    const updateQuote = () => {
        let data = {};
        if (title !== prevQuote.title) data.title = title;
        if (featured !== prevQuote.featured) data.featured = featured;
        if (status !== prevQuote.status) data.status = status;
        if (category !== prevQuote.category._id) data.category = category;
        if (author !== prevQuote.author._id) data.author = author;

        setLoading(true);
        axios.patch(`/api/quotes/${editID}`, data, config).then(() => {
            setLoading(false);
            cancelAll();
            setEditID("");
            setPrevQuote({});
            fetchQuotes();
        }).catch((error) => {
            setLoading(false);
            alert(error);
        });
    };

    const cancelAll = () => {
        setTitle("");
        setStatus("");
        setFeatured(false);
        setCategory("");
        setAuthor("");
        document.querySelector("#quote-author").value = "";
        document.querySelector("#quote-category").value = "";
        document.querySelector("#quote-status").value = "";
    };

    const showMsg = (msg) => {
        document.querySelector("#result-msg-quote").innerHTML = msg;
        setTimeout(() => {
            document.querySelector("#result-msg-quote").innerHTML = "";
        }, 3000);
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
                    <input type="text" placeholder="History" id="quote-category" className="form-input" onChange={searchCategory} />
                </div>
                <div className="col-10 col-sm-12 col-ml-auto d-flex">
                    {categories.length > 0 &&
                        categories.map((option, index) => {
                        return (
                            <span
                                className="chip c-hand"
                                key={index}
                                onClick={(e) => setCategoryOption(e, option)}
                            >
                                {option.name}
                            </span>
                        );
                    })}
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
                <div className="d-flex">
                    {loading
                        ? <div className="loading my-2 w-100"></div> 
                        : <input type="submit" value={`${editID ? 'Update' : 'Add'} Quote`} className="btn btn-primary my-2" onClick={editID ? updateQuote : addQuote} />}
                    <button type="button" className="btn btn-link mx-2 my-2" onClick={cancelAll}>Cancel</button>
                    <div className="mx-2 my-2" id="result-msg-quote"></div>
                </div>
                
            </form>
            <br />
            {quotes && (
                <table className="my-2">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    {quotes.map((quote, index) => (
                        <tr key={index}>
                            <td>{quote.title}</td>
                            <td>{quote.author.name}</td>
                            <td>{quote.category.name}</td>
                            <td>{quote.featured ? <TiTick /> : <TiTimes />}</td>
                            <td>{quote.status}</td>
                            <td>
                                <TiEdit onClick={() => editQuote(quote._id)} />
                                <TiDelete onClick={() => deleteQuote(quote._id)} />
                            </td>
                        </tr>
                    ))}
                </table>
            )}
            <br />
        </div>
    );
};

export default Quotes;
