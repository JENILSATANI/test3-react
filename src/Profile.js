import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2';
export default function Pp() {
    const { id } = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:9900/user`, { headers: { 'x-access-token': token } }).then((res) => {
            setName(res.data.data.username)
            setemail(res.data.data.email)
            setphonenumber(res.data.data.mobilenumber)
            setProfile(res.data.data.photo_path)
            console.log("hbhj", res)
        })
    }

    const postData = () => {
        let token = localStorage.getItem("token");

        let FD = new FormData();
        FD.append('username', name);
        FD.append('email', email)
        FD.append('mobilenumber', phonenumber)
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.put(`http://localhost:9900/user`, FD, { headers: { 'x-access-token': token } })
        history.push('/Userlist')

    }
    function logout() {
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
            title: 'Logout is successfully'
        })
        localStorage.clear()
        setTimeout(() => {
            window.location.reload(true);
        }, 3000);
    }

    return (
        <div>
            <br />
            <div className='Container'>
                <img src={profile} alt='' height='200' width='200' className='img-fluid rounded' ></img>
                <br />
                <br />
                <form>
                    <div>
                        <TextField
                            value={name}
                            id="input-with-icon-textfield"
                            onChange={(e) => setName(e.target.value)}
                            variant='outlined'
                            label='Username'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}

                        />

                    </div>
                    <br />
                    <div>
                        <TextField
                            value={email}
                            id="input-with-icon-textfield"
                            onChange={(e) => setemail(e.target.value)}
                            variant='outlined'
                            label='email'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailIcon />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            value={phonenumber}
                            id="input-with-icon-textfield"
                            onChange={(e) => setphonenumber(e.target.value)}
                            variant='outlined'
                            label='Mobilenumber'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </div>
                    <br />
                    {/* <input placeholder='profile' type='file' name='photo' onChange={(e) => setProfile(e.target.files)} /> */}

                    <br />
                    <br />

                    <Button onClick={postData} className="bg-success" type='submit'>Update</Button><span/>
                    <Button className="bg-primary" onClick={logout}>Logout</Button>

                </form>
            </div>
        </div>
    )
}
