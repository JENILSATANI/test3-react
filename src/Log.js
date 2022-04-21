/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable default-case */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { Grid, Paper, TextField, IconButton, InputAdornment } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { omit } from 'lodash'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import Swal from 'sweetalert2'
function Log() {
    const [password, setpassword] = useState(false)
    const [email, setemail] = useState("")
    const [error, setError] = useState("");
    let history = useHistory()
    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const handleChange = (event) => {
        event.preventDefault();
        event.persist();
        let name = event.target.name;
        let value = event.target.value;

        validate(event, name, value);
        setValues({
            ...values,
            [name]: value,
        })
    }
    const handleonclick = () => {
        setpassword(!password)
    }
    const handleonmousedown = () => {
        setpassword(!password)
    }
    const validate = (event, name, value) => {
        switch (name) {
            case 'email':
                if (
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
    // function postdata(e) {

    //     e.preventDefault();
    //     let item = {
    //         email: values.email,
    //         password: values.password
    //     }
    //     console.log(item)
    //     axios.post("http://localhost:9900/login", item).then((res) => {
    //         console.log("updare", res)
    //         if (res.data.success === true) {
    //             localStorage.setItem("token", res.data.token)
    //             // history.push('/Userlist')
    //             window.location.reload(true);
    //         }
    //     })

    // }


    function submitdata(e) {
        e.preventDefault();
        console.log("ss")
        if (values.email === '' || values.password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Enter Email and Password?</a>'
            })
        } else {

            let item = {
                email: values.email,
                password: values.password
            }
            console.log(item)
            axios.post("http://localhost:9900/login", item).then((res) => {
                console.log("updare", res)
                if (res.data.success === true) {
                    localStorage.setItem("token", res.data.token)
                    Swal.fire(
                        'Login Successfull!',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2000);
                }
            })
        }
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

                                            <form onSubmit={submitdata}>
                                
                                                <div className="d-flex align-items-center ">
                                                    {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i> */}
                                                    <span className="h3 fw-bold  " style={{textalign: "center" }}>Restaurant Management App</span>
                                                </div>
                                                {/* <h6 className="fw-normal" style={{ letterspacing: "1px" }}>Sign into your account</h6> */}
                                                <br/>
                                                <div className="form-outline mb-4">
                                                    <TextField
                                                        id="outlined-basic"
                                                        fullWidth label='email'
                                                        name='email'
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
                                                <Grid>

                                                    <div className="form-outline mb-4">
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
                                                </Grid>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                </div>
                                                <h4><a className="small text-muted" href="Fp">Forgot password?</a></h4>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="reg" style={{ color: "#393f81" }}>Register here</a></p>
                                                <a href="#!" className="small text-muted">Terms of use.</a>
                                                <a href="#!" className="small text-muted">Privacy policy</a>
                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_yfVrxfX--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/20k4t9fbnn4nhgahxpfq.PNG" class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Log