import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"

const Write = () => {
    const state = useLocation().state
    const [desc, setDesc] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState<any>('');
    const [cat, setCat] = useState(state?.cat || '');
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return

        setFile(e.target.files[0])
    }

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/api/upload", formData)
            return res.data

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();


        if (file === '') {
            setError('Please select an image')
            return
        }
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setError('Please select a valid image')
            return false;
        }

        const imgUrl = await upload();

        try {
            state
                ? await axios.put(`/api/posts/${state.id}`, {
                    title,
                    desc: desc,
                    cat,
                    img: file ? imgUrl : "",
                })
                : await axios.post(`/api/posts/`, {
                    title,
                    desc: desc,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='add'>
            <div className="content">
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' />
                <div className="editorContainer">
                    <ReactQuill className='editor' theme="snow" value={desc} onChange={setDesc} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input style={{ display: "none" }} type="file" id="file" name="" onChange={(e) => handleFile(e)} />
                    <label className='file' htmlFor="file">Upload Image</label>
                    <p className='error'>{error}</p>
                    <div className='buttons'>
                        <button>Save as a draft</button>
                        <button onClick={(e) => handleSubmit(e)}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "art"}
                            name="cat"
                            value="art"
                            id="art"
                            onChange={e => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "science"}
                            name="cat"
                            value="science"
                            id="science"
                            onChange={e => setCat(e.target.value)}

                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "technology"}
                            name="cat"
                            value="technology"
                            id="technology"
                            onChange={e => setCat(e.target.value)}

                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "cinema"}
                            name="cat"
                            value="cinema"
                            id="cinema"
                            onChange={e => setCat(e.target.value)}

                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "design"}
                            name="cat"
                            value="design"
                            id="design"
                            onChange={e => setCat(e.target.value)}

                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "food"}
                            name="cat"
                            value="food"
                            id="food"
                            onChange={e => setCat(e.target.value)}

                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write