import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer>
            <div className='socials'>
                <a className='link social' href='http://github.com/agustinGauna' target='blank' rel='nonopener noreferer'>
                    <FontAwesomeIcon className='icon github' icon={faGithub} />  Github
                </a>
                <a className='link social' href='https://www.linkedin.com/in/agustingauna97/' target='blank' rel='nonopener noreferer'>
                    <FontAwesomeIcon className='icon linkedin' icon={faLinkedin} />  Linkedin
                </a>
            </div>
            <span>
                Made with <b>React.js</b> and <b>TypeScript</b>
            </span>
        </footer>
    )
}

export default Footer