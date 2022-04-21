/* eslint-disable jsx-a11y/anchor-is-valid */
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Container, Grid, Paper } from '@material-ui/core';
import NoteCard from './NoteCard';
import ButtonGroup from '@mui/material/ButtonGroup';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Swal from 'sweetalert2';
function Copy() {

    const items = JSON.parse(localStorage.getItem("addtocart"))
    let history = useHistory();
    const [user, setuser] = useState([])
    const [myArray, updateMyArray] = useState([]);
    const [cartItem, setcartitem] = useState([]);

    const [itemCount, setItemCount] = React.useState();
    useEffect(() => {
        data()
        // console.log(items)
        // if (items) {
        //     items.forEach(element => {
        //         myArray.push(element)
        //     });
        // }
        // setItemCount(myArray.length)
    }, [])

    function data() {

        axios.get(`http://localhost:9900/ML`)
            .then(res => {
                console.log(res)
                const tableData = res.data.data
                // const array = [];
                //  array.push(tableData);
                setuser(tableData)
                // console.log(user)

            })

    }
    function deleteuser(_id) {
        console.log(_id);
        axios.delete(`http://localhost:9900/${_id}`).then((result) => {
            console.log("result.data", result);
            data()

        })

    }
    function updateuser(_id) {
        console.log(_id);
        history.push(`/Foodedit/${_id}`);

    }



    const addcart = (cart) => {
        Swal.fire(
            'Item Successfully add in cart!',
        )
        if (myArray.filter(value => value._id === cart._id).length > 0) {
            console.log("exites");
            Swal.fire(
                'Item is allready in cart!',
            )
        }
        else {
            setTimeout(() => {
                myArray.push(cart);
                console.log(myArray.length)
                setItemCount(myArray.length)
                localStorage.setItem('addtocart', JSON.stringify(myArray))
            }, 100)
            console.log("not exites")
        }
    }

    return (

        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: "20px" }}>
                
                <a class="navbar-brand" style={{ fontFamily: "monospace" }}>Food Information App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Badge color="secondary" badgeContent={itemCount}>
                    <a class="nav-link" href="Dd"> <ShoppingCartIcon /></a>
                </Badge>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto" style={{ fontFamily: "monospace" }}>

                        <li class="nav-item">
                            <a class="nav-link" href="Userlist">Userlist</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Profile">My-Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Profile">Logout</a>
                        </li>
                        <a
                            class="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                class="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>

                    </ul>
                </div>
            </nav>
            <Container>
                <Grid container spacing={3}>
                    {user.map((user, index) => (
                        <Grid item key={user.id} xs={12} md={6} lg={4}>
                            <NoteCard note={user} key={index}
                                item={user} handleclick={deleteuser} updateclick={updateuser} additem={addcart} />

                        </Grid>
                    ))}
                </Grid>
            </Container>




        </div>

    )
}




export default Copy