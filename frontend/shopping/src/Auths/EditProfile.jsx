import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {

    const token = localStorage.getItem("access");
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        const response = await fetch(`${BASE_URL}/profile/`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const data = await response.json();

        if(response.ok){
            setPhone(data.phone || "");
            setAddress(data.address || "");
        }

    }

    const handleSubmit = async (e)=>{

        e.preventDefault();

        const response = await fetch(`${BASE_URL}/profile/`,{

            method:"PATCH",

            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },

            body:JSON.stringify({
                phone,
                address
            })

        });

        const data = await response.json();

        if(response.ok){

            await Swal.fire({
                icon:"success",
                title:"Profile Updated",
                timer:1500,
                showConfirmButton:false
            });

            navigate("/profile");

        }else{

            Swal.fire({
                icon:"error",
                title:data.error || "Something went wrong"
            });

        }

    }

    return(

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Edit Profile
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={address}
                                        onChange={(e)=>setAddress(e.target.value)}
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >
                                    Save Changes
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EditProfile;