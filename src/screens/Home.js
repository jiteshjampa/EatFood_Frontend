import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Body from "../components/Body";
export default function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditems, setfooditems] = useState([]);
  const loaddata = async () => {
    const url = process.env.REACT_APP_URL_TO_BACKEND;
    const response = await fetch(`${url}/api/fooddata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    //console.log(json)
    setfooditems(json[0]);
    setfoodcat(json[1]);
  };
  useEffect(() => {
    loaddata();
  }, []);
  const filterStyles = {
    filter: "invert(0) grayscale(50)",
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control bg-dark text-light border-1 border-secondary me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
                {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://t3.ftcdn.net/jpg/05/60/70/82/360_F_560708240_pMZPOuSfvblWGRoaiZFLT4wiFTzQPwQe.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://static.toiimg.com/photo/64463630.cms"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={filterStyles}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={filterStyles}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodcat != [] ? (
          foodcat.map((data) => {
            return (
              <div>
                <div key={data._id} className="mt-3">
                  {data.CategoryName}
                </div>
                <hr />
                <div className="container d-flex flex-wrap">
                  {fooditems != [] ? (
                    fooditems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filteritems) => {
                        return (
                          <div key={filteritems._id}>
                            <Body
                              fooditems={filteritems}
                              options={filteritems.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such Data Found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>*************</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
