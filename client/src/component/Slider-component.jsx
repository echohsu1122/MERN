import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import gatsby from "../assets/slide_img/undraw_gatsbyjs_st4g.svg";
import modern_art from "../assets/slide_img/undraw_modern_art_re_pff5.svg";
import next_js from "../assets/slide_img/undraw_next_js_-8-g5m.svg";
import progressive_app from "../assets/slide_img/undraw_progressive_app_m-9-ms.svg";
import nuxt_js from "../assets/slide_img/undraw_nuxt_js_0fq9.svg";
import react_re from "../assets/slide_img/undraw_react_re_g3ui.svg";
import web from "../assets/slide_img/undraw_static_assets_rpm6.svg";
import website from "../assets/slide_img/undraw_static_website_re_x70h.svg";
import tailwind_css from "../assets/slide_img/undraw_tailwind_css_1egw.svg";
import web_development from "../assets/slide_img/undraw_web_development_0l6v.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function SliderComponent() {
  let selectRef = useRef(null);
  let [index, setIndex] = useState(0);

  visualViewport.addEventListener("resize", () => {
    console.log("偵測visualViewport");

    if (!selectRef) {
      selectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  });

  function handleNext() {
    flushSync(() => {
      if (index < 9) {
        setIndex(index + 1);
      } else {
        setIndex(9);
      }
    });
    selectRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
  function handlePre() {
    flushSync(() => {
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setIndex(9);
      }
    });
    selectRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  }

  return (
    <div className="container position-relative">
      <div className="row flex-nowrap overflow-x-hidden ">
        <div
          key="0"
          ref={index == 0 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2  "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={gatsby} />
            </div>
            <div className="card-body">
              <h5 className="card-title">Gatsby - The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="1"
          ref={index == 1 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={modern_art} />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                UIUX Design - The Complete Guide 2023
              </h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="2"
          ref={index == 2 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={next_js} />
            </div>
            <div className="card-body">
              <h5 className="card-title">Next_js - The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="3"
          ref={index == 3 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={progressive_app} />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Progressive App - The Complete Guide 2023
              </h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="4"
          ref={index == 4 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={nuxt_js} />
            </div>
            <div className="card-body">
              <h5 className="card-title">nuxt_js - The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="5"
          ref={index == 5 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={web_development} />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                UIUX Design - The Complete Guide 2023
              </h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="6"
          ref={index == 6 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4  col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={react_re} />
            </div>
            <div className="card-body">
              <h5 className="card-title">react- The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="7"
          ref={index == 7 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={web} />
            </div>
            <div className="card-body">
              <h5 className="card-title">web - The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="8"
          ref={index == 8 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={website} />
            </div>
            <div className="card-body">
              <h5 className="card-title">website - The Complete Guide 2023</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
        <div
          key="9"
          ref={index == 9 ? selectRef : null}
          className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 "
        >
          <div className="card">
            <div className="img-wrapper">
              <img src={tailwind_css} />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                tailwind_css - The Complete Guide 2023
              </h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                前往購物車
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute top-50 start-0 translate-middle-y text-black">
        <FontAwesomeIcon
          className="btn p-0"
          onClick={handlePre}
          icon={faAngleLeft}
          size="2xl"
        />
      </div>
      <div className="position-absolute top-50 end-0 translate-middle-y">
        <FontAwesomeIcon
          className="btn p-0"
          onClick={handleNext}
          icon={faAngleRight}
          size="2xl"
        />
      </div>
    </div>
  );
}
