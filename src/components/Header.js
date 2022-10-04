import React, { useState, useEffect } from "react";
import { useAuth } from "./../components/Context";
import { Loading } from "./../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function Header() {
    const [isLoading, setIsLoading] = useState(false)
    const { token, setToken } = useAuth()
    const userName = localStorage.userName;

    useEffect(() => {
        localStorage.setItem('token', token)
        // console.log('header token', token)
        setToken(localStorage.getItem('token'))
    }, []);

    const axios = require('axios').default;
    async function logOutBtn() {
        setIsLoading(true)
        console.log(isLoading)
        await axios.delete('https://todoo.5xcamp.us/users/sign_out', {
            headers: {
                authorization: localStorage.token
            }
        })
            .then(res => {
                Toast.fire({
                    icon: 'success',
                    title: `登出成功：${res.data.message}`,
                })
            })
            .then(() => setToken(null))
            .catch(err => {
                const error = err.response.data;
                MySwal.fire({
                    icon: 'error',
                    title: error.message,
                })

            })
        setIsLoading(false)
    }

    return (
        <>
            { isLoading ? <Loading /> : false}
            <nav>
                <h1><span>ONLINE TODO LIST</span></h1>
                <ul>
                    <li className="todo_sm">
                        <FontAwesomeIcon class="faCircleUser" icon={faCircleUser}></FontAwesomeIcon>
                        <span>{userName}的代辦</span>
                    </li>
                    <li><a href="#" onClick={logOutBtn}>登出</a></li>
                </ul>
            </nav>
        </>
    )
}


export default Header;