import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { Post } from '../../src/types'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import { UserContextType } from '../context/types'
const Single = () => {

    const [post, setPost] = useState<Post>()

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split("/")[2]

    const { currentUser } = useContext(AuthContext) as UserContextType

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts/${postId}`)
                setPost(res.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [postId])


    const handleDelete = async (id: number) => {

        try {

            await axios.delete(`/api/posts/${postId}`)
            navigate('/')

        } catch (error) {
            console.log(error)
        }

    }

    const getText = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    <img src={post?.userImg} alt="" />
                    <div className="info">
                        <span>{post?.username}</span>
                        <p>Posted {moment(post?.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post?.username ?
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={() => handleDelete(post?.id)} src={Delete} alt="" />
                        </div> : <></>}
                </div>
                <h1>{post?.title}</h1>
                {getText(post?.desc)}
            </div>
            <Menu cat={post?.cat} />
        </div>
    )
}

export default Single