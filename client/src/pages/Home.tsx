import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Post } from '../../src/types'

const Home = () => {

    const [posts, setPosts] = useState<Post[]>([])

    const cat = useLocation().search
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [cat])

    const handleNavigate = (id: number) => {
        navigate(`/post/${id}`)
    }

    const getText = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='home'>
            {posts.length > 0 ?
                <div className="posts">
                    {posts.map(post => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={`../upload/${post.img}`} alt="" />
                            </div>
                            <div className="content">
                                <Link className='link' to={`/post/${post.id}`}>
                                    <h1>{post.title}</h1>
                                </Link>
                                <p>{getText(post.desc)}</p>
                                <button onClick={() => handleNavigate(post.id)}>Read more</button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <></>
            }
        </div>
    )
}

export default Home