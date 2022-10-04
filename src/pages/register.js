import React from "react"
import { useAuth } from "../components/Context";
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import logoPic from './../images/checklistLogo.png'
import imgPic from './../images/cool.png'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Register() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const axios = require('axios').default;
  const onSubmitEvent = async (data) => {
    const postData = { user: data };
    console.log(postData)
    await axios.post('https://todoo.5xcamp.us/users', postData)
      .then(resHead => {
        console.log('resHead', resHead)
        setToken(resHead.headers.authorization);
        localStorage.setItem('token', resHead.headers.authorization);
        localStorage.setItem('userName', resHead.data.nickname);

        MySwal.fire({
          icon: 'success',
          title: resHead.data.message,
        })
        navigate('/todo')
      })
      .catch(err => {
        console.log('err', err)
        const error = err.response.data
        return MySwal.fire({
          icon: 'error',
          title: error.message,
          text: error.error?.join()
        })
      })
  }

  // const onSubmitEvent = postData => {
  //   const _url = "https://todoo.5xcamp.us/users";
  //   console.log({
  //     user: postData
  //   });
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   fetch(_url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: postData
  //     })
  //   })
  //     .then(resHead => {
  //       console.log(resHead)
  //       setToken(resHead.headers.get("authorization"));
  //       localStorage.setItem('token', resHead.headers.get("authorization"));
  //       return resHead.json()
  //     })
  //     .then(response => {
  //       console.log(response)
  //       MySwal.fire({
  //         // toast: true,
  //         // position: 'top-end',
  //         icon: response.message === '註冊成功' ? 'success' : 'error',
  //         title: response.message,
  //         text: response.error?.join() //if 422 fail
  //       })
  //       localStorage.setItem('userName', response.nickname);
  //       navigate('/login') // if 201 success
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       return MySwal.fire({
  //         icon: 'error',
  //         title: err.message,
  //       })
  //     })

  // }


  return (
    <div id="signUpPage" className="bg-img">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#"><img className="logoImg" src={logoPic} alt="" /></a>
          <img className="d-m-n" src={imgPic} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="text"
              name="email" placeholder="請輸入 email"
              id="email" {
              ...register("email", {
                required: { value: true, message: "此欄位必填" },
                pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.email?.message}</span>
            <label className="formControls_label" htmlFor="name">您的暱稱</label>
            <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱"
              id="nickname" {
              ...register("nickname", {
                required: { value: true, message: "此欄位必填" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.nickname?.message}</span>
            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" type="password" name="password" placeholder="請輸入密碼"
              id="password" {
              ...register("password", {
                required: { value: true, message: "此欄位必填" },
                minLength: { value: 6, message: "密碼至少為 6 碼" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.password?.message}</span>
            <label className="formControls_label" htmlFor="confirmPassword">再次輸入密碼</label>

            <input className="formControls_input" type="password" name="confirmPassword" placeholder="請輸入密碼"
              id="confirmPassword" {
              ...register("confirmPassword", {
                required: { value: true, message: "此欄位必填" },
                minLength: { value: 6, message: "密碼至少為 6 碼" },
                validate: value => value === watch('password') || "密碼不一致"
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.confirmPassword?.message}</span>
            <input className="formControls_btnSubmit" type="submit" value="註冊帳號" disabled={Object.keys(errors).length > 0} />
            <Link className="formControls_btnLink" to="/login">登入</Link>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register;
