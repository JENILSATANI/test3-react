import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
export default function Pp() {
    const { id } = useParams();
    let history = useHistory();

    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [quantities, setquantities] = useState('');
    const [description, setdescription] = useState('')
    const [profile, setProfile] = useState([]);
    

 

    const postData = () => {
        let FD = new FormData();
        FD.append('name', name);
        FD.append('quantities', quantities);
        FD.append('description', description)
        FD.append('price', price);
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.post('http://localhost:9900/adduser', FD)
        history.push('/Food')

    }
 const onsubmit = (e) =>{
     e.preventDefault()
     if(name === '' || profile === '' ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Add Right Medicine?</a>'
        })
     }
     else{
        let FD = new FormData();
        FD.append('name', name);
        FD.append('quantities', quantities);
        FD.append('description', description)
        FD.append('price', price);
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.post('http://localhost:9900/adduser', FD)
        history.push('/Food')
     }
 }
    return (
        <div>
            <div className='Container'>
                <form onSubmit={onsubmit}>
                    <div>
                        <TextField value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='standard'
                            label='name'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={quantities}
                            onChange={(e) => setquantities(e.target.value)}
                            variant='standard'
                            label='quantities'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={description} 
                        onChange={(e) => setdescription(e.target.value)} 
                        variant='standard'
                        label='description'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={price}
                         onChange={(e) => setprice(e.target.value)} 
                         variant='standard'
                         label='price'
                        />
                    </div>
                    <br />
                    <input placeholder='profile' type='file' name='photo' onChange={(e) => setProfile(e.target.files)} />
                    <br />
                    <br />

                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </div>
    )
}
