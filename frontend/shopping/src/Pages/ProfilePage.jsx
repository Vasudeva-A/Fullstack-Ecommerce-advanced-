import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { BASE_URL } from "../config";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        alert("Session Expired. Please Login Again.");

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
        return;
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please choose an image.");
      return;
    }

    const formData = new FormData();
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
        alert("Profile image updated successfully.");
        fetchProfile();
        setImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body p-5">

              <h2 className="text-center fw-bold text-primary mb-4">
                My Profile
              </h2>

              <div className="text-center mb-4">

                {profile.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="rounded-circle shadow"
                    style={{
                      width: "170px",
                      height: "170px",
                      objectFit: "cover",
                      border: "5px solid #0d6efd",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow"
                    style={{
                      width: "170px",
                      height: "170px",
                      fontSize: "70px",
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
                    Upload Profile Image
                  </button>

                </div>

              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label fw-bold text-secondary">
                  Username
                </label>

                <div className="form-control bg-light">
                  {profile.username}
                </div>
              </div>

              {/* <div className="mb-3">
                <label className="form-label fw-bold text-secondary">
                  Email
                </label>

                <div className="form-control bg-light">
                  {profile.email}
                </div>
              </div> */}

              <div className="mb-3">
                <label className="form-label fw-bold text-secondary">
                  Phone Number
                </label>

                <div className="form-control bg-light">
                  {profile.phone || "Not Added"}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-secondary">
                  Address
                </label>

                <div
                  className="form-control bg-light"
                  style={{ minHeight: "90px" }}
                >
                  {profile.address || "Not Added"}
                </div>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit Profile
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;