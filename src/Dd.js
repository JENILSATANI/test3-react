/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart'
import { Link, useHistory, useParams } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from "@material-ui/core/Button";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';
function Cart() {
  const { id } = useParams();
  const initialvalue = JSON.parse(localStorage.getItem("addtocart"));
  const [myArray, setMyArray] = useState(initialvalue);
  const [item, setitem] = useState(initialvalue)
  const itemsPrice = item.reduce((a, c) => a + c.quantities * c.price, 0);
  const totalPrice = itemsPrice

  const print = () => {

    const divToDisplay = document.getElementById('div')
    html2canvas(divToDisplay,
      {
        useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
        onrendered: function (canvas) {
          divToDisplay.appendChild(canvas);
        }
      }).then(function (canvas) {
        const divImage = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(divImage, 'PNG', 0, 0);
        pdf.save("download.pdf");
      })
  };

  function myFunction() {
    Swal.fire({
      title: 'Are you sure you want to confirm your order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Conform',
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Order Confirm!', '', 'success')
        setTimeout(() => {

          print()
        }, 2000);
      } else if (result.isDenied) {
        Swal.fire('Your Order is Cancel', '', 'info')
      }
    })
  }
  const xyz = (index) => {

    const list = [...item];
    list.splice(index, 1);
    setitem(list);
    console.log(list, "sbdj")
    localStorage.setItem('addtocart', JSON.stringify(list))
  }
  function deleteitem() {
    Swal.fire({
      title: 'Do you want Delete the item?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        setTimeout(() => {
          xyz()
        }, 2000);
      } else if (result.isDenied) {
        Swal.fire('Item is not deleted', '', 'info')
      }
    })
  }
  const handleChange = (items_id,quantities) => {
    if(quantities>=0){
      
      setitem(item => item.map((test) => items_id === test._id ? { ...test, quantities: parseInt(test.quantities) + 1 } : test))
    }
  }
  const handleChange1 = (items_id,quantities) => {
    if(quantities<=1){
      return false
    }else{

      setitem(item => item.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) - 1 } : item))
    }
  }
  return (

    <div>
      <div id='div'>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Medicinename</th>
              <th scope="col">description</th>
              <th scope="col">price</th>
              <th style={{ width: "100px" }} scope="col">AddItem</th>


            </tr>
          </thead>
          {
            item.map((items, i) => {
              // console.log(i)
              return (
                <tbody>
                  <tr key={i}>

                    <td style={{ width: "100px" }} ><img src={items.photo_path} style={{ height: '100px', width: "80px" }} /></td>
                    <td style={{ width: "100px" }}>{items.name}</td>
                    <td style={{ width: "100px" }}>{items.description}</td>
                    <td style={{ width: "100px" }}> {items.price}</td>

                    <td>
                      <button onClick={() => handleChange(items._id,items.quantities)}><AddIcon /></button>
                      <Button  color="primary">
                        {items.quantities}
                      </Button>
                      <button onClick={() => handleChange1(items._id,items.quantities)}><RemoveIcon /></button>
                    </td>
                    <td style={{ width: "100px" }}>
                      {items.quantities * items.price}
                    </td>
                    <td style={{ width: "100px" }}>
                      <button className='btn btn-danger ms-2'
                        onClick={() => deleteitem(i)}>
                        <DeleteOutlineIcon /></button>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
          <tfoot>
            <tr>
              <td>total price :{totalPrice}</td>
              <td>
                <h2> </h2>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
      <button className='btn btn-dark' onClick={myFunction}>Confirm Order</button>
      <span />
      {/* <button className='btn btn-dark'>Pay</button> */}
    </div>

  )
}

export default Cart