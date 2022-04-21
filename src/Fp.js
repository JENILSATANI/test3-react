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
function Log() {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [password, setpassword] = useState(false)
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
    function postdata(e) {
        e.preventDefault();
        let item = {
            email: values.email,
            password: values.password
        }
        console.log(item)
        axios.put("http://localhost:9900/savepassword", item).then((res) => {
            console.log("updare", res)
            // window.location.reload(true)
            history.push('/')
        })

    }
    return (
        <div>
            <section class="vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>Forget Your Password</h5>

                            <form>
                                <div class="form-outline mb-4">
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

                                <div class="form-outline mb-4">
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

                                <button type="submit" class="btn btn-primary btn-lg btn-block" onClick={postdata}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Log