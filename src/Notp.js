/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable default-case */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Grid, Paper, Box, Avatar, TextField, Button, Typography, Link as NavLink } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { omit } from 'lodash'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone';
import Swal from 'sweetalert2';
function Otp() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "60px auto" }
    const avatarStyle = { backgroundColor: '#6d7f9f' }   //  #3370bd
    const btnstyle = { marginTop: '28px ', backgroundColor: '#6d7f9f' }
    const [counter, setCounter] = React.useState(59);
    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        code: ''
    })
    const [user, setUser] = useState({

    });
    const { fname, lname, email, phone } = user;


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

    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    function postdata(e) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'OTP Verify is done!'
        })
        e.preventDefault();
        let item = {
            mobilenumber: localStorage.getItem('mobile'),
            code: values.code
        }
        console.log(item)
        axios.post("http://localhost:9900/verify", item).then((res) => {
            console.log("updare", res)
            if (res.data.success === true) {
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    window.location.reload(true);

                }, 3000);
            }

        })

    }
    const validate = (event, name, value) => {
        switch (name) {
            case 'code':
                if (
                    !new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        code: 'Mobile number must be 10 digits.'
                    })
                } else {

                    let newObj = omit(errors, "code");
                    setErrors(newObj);

                }
                break;
        }
    }

    function Resedndata(e) {
        e.preventDefault();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'OTP resend is success'
        })

        let item = {
            mobilenumber: localStorage.getItem('mobile'),
            code: values.code
        }
        console.log(item)
        axios.post("http://localhost:9900/resend", item).then((res) => {
            console.log("updare", res)
            if (res.data.success === true) {
                localStorage.setItem("token", res.data.token)
                window.location.reload(true);
            }

        })

    }
    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>

                        <Avatar style={avatarStyle}></Avatar>
                        <h4 style={{ color: "green" }}></h4>

                        <Box color="text.secondary">
                            <Typography variant="body2">
                                Enter OTP Sent to your mobile number XXXXXX9989
                            </Typography>
                        </Box>
                    </Grid>
                    <br />
                    <form>
                        <TextField
                            label="Enter 6 Digit OTP"
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ maxLength: 6 }}
                            name="code"
                            size="small"
                            type="text"
                            fullWidth
                            validators={['required']}
                            errorMessages={['OTP is required']}
                            value={values.code}
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={postdata} fullWidth>VERIFY</Button>

                    </form>
                    <Box mt={3} ><Typography fontWeight={500} align="center" color='textSecondary'> Resend OTP in <span style={{ color: "green", fontWeight: "bold" }}> 00:{counter}</span> </Typography></Box>

                    <Typography align="center">
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={Resedndata} fullWidth>Resend Otp</Button>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    )
}

export default Otp