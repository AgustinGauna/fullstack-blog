import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { UserContextType } from '../../src/context/types'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext) as UserContextType


    return (
        <div className='navbar'>
            <div className="container">
                <Link to="/" className="logo">
                    <img src={Logo} alt="" />
                </Link>
                <div className="link">
                    <Link to='/?cat=art' className='link'>
                        <h6>ART</h6>
                    </Link>
                    <Link to='/?cat=science' className='link'>
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link to='/?cat=technology' className='link'>
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link to='/?cat=cinema' className='link'>
                        <h6>CINEMA</h6>
                    </Link>
                    <Link to='/?cat=design' className='link'>
                        <h6>DESIGN</h6>
                    </Link>
                    <Link to='/?cat=food' className='link'>
                        <h6>FOOD</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logout}>Logout</span> :
                        <Link className='link' to="/login">
                            Login
                        </Link>
                    }
                    <Link className='link' to='/write'>
                        <span className='write'>
                            Write
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar