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
      const response = await fetch(`${BASE_URL}/register/profile/`, {
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
    <div style={{ width: "350px", margin: "40px auto" }}>
      <h2>My Profile</h2>

      {/* Profile Image */}

      {profile.profile_image ? (
        <img
          src={profile.profile_image}
          alt=""
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid gray",
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#0d6efd",
            color: "white",
            fontSize: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {profile.email.charAt(0).toUpperCase()}
        </div>
      )}

      <br />

      <input type="file" onChange={handleImage} />

      <br />
      <br />

      <button onClick={uploadImage}>Upload Image</button>

      <hr />

      <h4>{profile.username}</h4>

      <p>Email : {profile.email}</p>

      <p>Phone : {profile.phone}</p>

      <p>Address : {profile.address}</p>
    </div>
  );
};

export default ProfilePage;
