// import SimpleImageSlider from "react-simple-image-slider";
// import './Userlist.css'
// import React from "react";
// const images = [
//   { url: "https://w0.peakpx.com/wallpaper/66/448/HD-wallpaper-pills-drugs-pharma-pharmacy-color-medicine-capsule-rx.jpg" },
//   { url: "https://w0.peakpx.com/wallpaper/478/123/HD-wallpaper-medicine.jpg" },
//   { url: "https://w0.peakpx.com/wallpaper/958/169/HD-wallpaper-white-medicine-capsule-in-close-up-graphy.jpg" },
//   { url: "https://w0.peakpx.com/wallpaper/670/947/HD-wallpaper-play-doctor-medicine-hospital-doctor-nurse-health-get-well-firefox-persona-medical.jpg"},
//   { url: "https://w0.peakpx.com/wallpaper/221/412/HD-wallpaper-capsules-lifesaving-medicine.jpg" },
//   {url:"https://blog.capterra.com/wp-content/uploads/2019/10/HEAD-Top_9_Medical_Apps_for_Doctors_Hero_no_text.png"}
// ];

// const App = () => {
//   return (
    
//     <div className="container fluid">
//       <SimpleImageSlider
//         width={1100}
//         height={800}
//         images={images}
//         showBullets={true}
//         showNavs={true}
//         slideDuration={1.2}
//         autoPlay={1.2}

//       />
//     </div>
//   );
// }
// export default App
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Copy() {
    let history = useHistory();
    const [user, setuser] = useState([])
    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:9900/users`, { headers: { 'x-access-token': token } })
            .then(res => {
                console.log(res)
                const tableData = res.data.data
                // const array = [];
                //  array.push(tableData);
                setuser(tableData)
                console.log(user)

            })

    }
    function deleteuser(_id) {
        console.log(_id);
        let token = localStorage.getItem("token");
        axios.delete(`http://localhost:9900/de/${_id}`, { headers: { 'x-access-token': token } }).then((result) => {
            console.log("result.data", result);
            data()

        })

    }

    const columns = [
        {
            title: 'username', field: "username"
        },
        {
            title: "email", field: "email"

        },
        // {
        //     title: "mobilenumber", field: "mobilenumber"

        // },
        {
            title: "User Image", field: "photo_path", render: (rowData) => <img src={rowData.photo_path} style={{ width: 60, height: 60 }} alt='' />,

        },
    ]


    return (


            <div>
             
                <div>
                    <MaterialTable title=" User List"

                        data={user}
                        columns={columns}

                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => deleteuser(rowData._id)

                            }
                        ]}
                    />


                </div>
            </div>
            )
}




            export default Copy