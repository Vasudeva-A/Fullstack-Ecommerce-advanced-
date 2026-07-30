import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Loader from "../Components/Loader/Loader";
import {BASE_URL} from "../config"
const ProfilePage = () => {
  let [profile, setProfile] = useState();
  let [image, setImage] = useState(null);
  let token = localStorage.getItem("access");
  //   console.log(token)
  let navigate = useNavigate()

  let fetchProducts = async () => {
    try {
      let response = await fetch(`${BASE_URL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401){
        alert("Your Session has been Expired TO continue Please Login Again")
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        navigate('/login')
        return
      }
      let data = await response.json();
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  let handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  let uploadImage = async () => {
    if (!image) {
      alert("Please Upload a image ");
      return;
    }
    let formData = new FormData();
    formData.append("profile_image", image);

    try {
      const response = await fetch(`${BASE_URL}/profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert("Profile image updated");
        fetchProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!profile)  {
    return <Loader/>
  }

 return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-5 text-center">

            <h2 className="fw-bold mb-4 text-primary">
              My Profile
            </h2>

            {/* Profile Image */}
            {profile.profile_image ? (
              <img
                src={profile.profile_image}
                alt="Profile"
                className="rounded-circle shadow"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  border: "4px solid #0d6efd",
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto shadow"
                style={{
                  width: "150px",
                  height: "150px",
                  fontSize: "60px",
                  fontWeight: "bold",
                }}
              >
                {profile.email.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="mt-4">
              <input
                type="file"
                className="form-control"
                onChange={handleImage}
              />

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={uploadImage}
              >
                Upload Image
              </button>
            </div>

            <hr className="my-4" />

            <div className="text-start">

              <div className="mb-3">
                <h6 className="text-muted mb-1">Username</h6>
                <p className="fw-semibold fs-5">{profile.username}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-1">Email</h6>
                <p>{profile.email}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-1">Phone</h6>
                <p>{profile.phone || "Not Provided"}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-1">Address</h6>
                <p>{profile.address || "Not Provided"}</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
);
};

export default ProfilePage;
