/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Swal from 'sweetalert2'
function Rendering() {
    const [profile, setProfile] = useState([]);
    const [password, setpassword] = useState(false)

    let history = useHistory()
    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: "",
        phone: "",
        password: '',
        profile: ""
    })
    const validate = (event, name, value) => {

        switch (name) {
            case 'username':
                if (
                    !new RegExp(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        username: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
                    })
                } else {

                    let newObj = omit(errors, "username");
                    setErrors(newObj);

                }
                break;
            case 'email':
                if (
                    // eslint-disable-next-line no-useless-escape
                    !new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
            case 'phone':
                if (
                    !new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        phone: 'Mobile number must be 10 digits.'
                    })
                } else {

                    let newObj = omit(errors, "phone");
                    setErrors(newObj);

                }
                break;
            case 'password':
                if (
                    !new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        password: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

        }
    }
    const handleChange = (event) => {
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })

    }
    const handleonclick = () => {
        setpassword(!password)
    }
    const handleonmousedown = () => {
        setpassword(!password)
    }
    const postdata = (e) => {
        e.preventDefault()
        if (values.password === '') {
            
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'First Add all data ?'
            })
        } else {
            let FD = new FormData();
            FD.append('username', values.username)
            FD.append('mobilenumber', values.phone)
            FD.append('email', values.email)
            FD.append('password', values.password)
            FD.append('photo', profile[0])
            console.log("ss", profile)

            console.log(FD)
            axios.post("http://localhost:9900/per", FD).then((res) => {
                console.log("updare", res)
                if(res.data.success == true){
                    let item = {
                        mobilenumber: values.phone,
                    }
                    console.log(item)
                    axios.post("http://localhost:9900/otp", item).then((res) => {
                        console.log("updare", res)
            
                        localStorage.setItem("mobile", values.phone);
            
                        // history.push('/Notp')
                    })
                }
            })
            Swal.fire(
                'Good job!',
                'Otp sent Successfull!',
                'success'
            )
            setTimeout(() => {
                history.push('Notp')
            }, 2000);
        }

    }
    function changedata() {
        history.push('/')
    }
    function otpdta() {
        history.push('/Otp')
    }

    return (
        <div>
            <section class="vh-100" style={{ backgroundcolor: "#eee" }}>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" style={{ borderradius: "25px" }}>
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <div class="row d-flex justify-content-center align-items-center h-100" style={{ margin: "20" }}>

                                                            

                                                            <div class="form-check form-check-inline mb-0 me-6">
                                                                <input
                                                                    class="form-check-input"
                                                                    type="radio"
                                                                    name="inlineRadioOptions"
                                                                    value={2}
                                                                    onClick={(e) => otpdta(e.target.value)}


                                                                />
                                                                <label class="form-check-label" for="maleGender">MobileNumber</label>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <TextField name='username'
                                                            fullWidth label='username'
                                                            variant='outlined'
                                                            value={values.username}
                                                            onChange={handleChange}
                                                            error={Boolean(errors.username)}
                                                            helperText={errors.username}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <IconButton>
                                                                            <PersonIcon />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}

                                                        />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <TextField name='phone'
                                                            fullWidth label='phone'
                                                            type='number'
                                                            variant='outlined'
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            error={Boolean(errors.phone)}
                                                            helperText={errors.phone}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <IconButton>
                                                                            <PhoneIcon />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <TextField type="password"
                                                            name='password'

                                                            fullWidth label='password'
                                                            variant="outlined"
                                                            value={values.password}
                                                            type={password ? 'text' : 'password'}
                                                            onChange={handleChange}
                                                            error={Boolean(errors.password)}
                                                            helperText={errors.password}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <IconButton

                                                                            onClick={handleonclick}
                                                                            onMouseDown={handleonmousedown}
                                                                        >
                                                                            {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }} />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <TextField name='email'
                                                            fullWidth label='Email'
                                                            variant="outlined"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            error={Boolean(errors.email)}
                                                            helperText={errors.email}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <IconButton>
                                                                            <EmailIcon />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    </div>
                                                    <input placeholder='profile' type='file' name='photo' onChange={(e) => setProfile(e.target.files)} />

                                                </div>
                                                <div class="form-check d-flex justify-content-center mb-5">
                                                    <label class="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" class="btn btn-primary btn-lg" onClick={postdata}>SentOTP</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://www.softermii.com/assets/uploads/blog/20220408/cover-big.webp" class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Rendering