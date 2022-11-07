import React, { useState, useEffect } from 'react'
import { MenuProps } from '../types';
import axios from "axios"
import { Post } from '../types';

const Menu = ({ cat }: MenuProps) => {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts/?cat=${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [cat])


    /*  const posts = [
         {
             id: 1,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
         },
         {
             id: 2,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
         },
         {
             id: 3,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
         },
         {
             id: 4,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
         },
     ]; */

    return (
        <div className='menu'>
            <h1>Other posts you may like</h1>

            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>
            ))}

        </div>
    )
}

export default Menu