import React from "react";

const Slider = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide mb-5"
      data-bs-ride="carousel"

    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="public/slider.jpg" className="d-block w-100 " alt="..." />
        </div>
        {/* <div className="carousel-item">
      <img src="assets/slider.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
<img src="assets/slider.jpg" className="d-block w-100" alt="..." />    </div> */}
      </div>
    </div>
  );
};

export default Slider;
