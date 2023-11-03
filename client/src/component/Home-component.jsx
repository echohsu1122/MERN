import slide1 from "../assets/homeslide_img/join_re.svg";
import slide2 from "../assets/homeslide_img/undraw_book_lover_re_rwjy.svg";
import slide3 from "../assets/homeslide_img/undraw_term_sheet_re_ju7s.svg";
import slide4 from "../assets/homeslide_img/undraw_team_up_re_84ok.svg";
import hotTopic1 from "../assets/undraw_designer_re_5v95.svg";
import hotTopic2 from "../assets/undraw_product_iteration_kjok.svg";
import hotTopic3 from "../assets/undraw_all_the_data_re_hh4w.svg";
import hotTopic4 from "../assets/undraw_code_typing_re_p8b9.svg";
import hotTopic5 from "../assets/undraw_stepping_up_g6oo.svg";
import hotTopic6 from "../assets/undraw_cohort_analysis_stny.svg";
import hotTopic7 from "../assets/undraw_focus_sey6.svg";
import hotTopic8 from "../assets/undraw_compose_music_re_wpiw.svg";
import SliderComponent from "./Slider-component";
const HomeCompoment = () => {
  return (
    <>
      <main>
        <div style={{ padding: "3rem" }}>
          <div
            id="carouselExampleIndicators"
            className="carousel carousel-dark slide mb-5 mt-3"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slide1} alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slide2} alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slide3} alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slide4} alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="text-center">
            <h3>現享優惠，隨時學習</h3>
            <p>
              購買課程只要$370起，用更低的費用，以自己想要的方式享受學習自由。
            </p>
          </div>
        </div>
        <div className="mb-5">
          <h3 className="text-center mb-5">熱門類別</h3>
          <div className="container text-center">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4  ">
              <div className="col mb-3 mr-sm-3">
                <figure className="figure ">
                  <div className="figure-img-wrapper ">
                    <img
                      src={hotTopic1}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption  fs-5 text-center">
                    設計
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic2}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    開發
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic3}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    市場行銷
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic4}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    IT與軟體
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic5}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    個人成長
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic6}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    商業
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper">
                    <img
                      src={hotTopic7}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center">
                    攝影
                  </figcaption>
                </figure>
              </div>
              <div className="col mb-3 mr-3">
                <figure className="figure">
                  <div className="figure-img-wrapper ">
                    <img
                      src={hotTopic8}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </div>
                  <figcaption className="figure-caption fs-5 text-center fs-5 text-center">
                    音樂
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card mb-3 border border-0">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-3 fw-bold">
                    為您的團隊提升技能
                  </h5>
                  <ul className="card-text fs-5">
                    <li>隨時隨地皆能無限制地存取24000門以上的頂尖課程</li>
                    <li>國際課程收藏 (支援 14 種語言)</li>
                    <li>科技及商業的頂尖證書</li>
                  </ul>
                  <button className="btn btn-outline-dark">瞭解更多</button>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="mb-5">
          <h3 className="text-center mb-5">為您推薦</h3>
          <SliderComponent />
        </div>
        <div className="mb-5">
          <h3 className="text-center mb-5">精選課程</h3>
          <SliderComponent />
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card mb-3 border border-0">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fs-3 fw-bold">成為講師</h5>
                      <p
                        className="card-text fs-5"
                        style={{ maxWidth: "400px" }}
                      >
                        在這裡有來自世界各地的講師為數百萬名學習者講授課程。我們為您準備各種工具與技能，助您教授您所熱愛的事物。
                      </p>
                      <button className="btn btn-outline-dark">
                        立即開始分享
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-bg-dark p-3  text-center ">
        <div className="container ">
          <div className="row fs-2 mb-3 justify-content-center">
            頂尖公司的選擇，打造需要的職場技能
          </div>

          <div className="row row-cols-1 row-cols-md-3 mb-3">
            <div className="col">
              <div className="row fs-5 fw-bold">Abstract</div>
              <div className="row">Start Trial</div>
              <div className="row">Download</div>
              <div className="row">Pricing</div>
            </div>
            <div className="col">
              <div className="row fs-5 fw-bold">Resources</div>
              <div className="row">Blog</div>
              <div className="row">Help Center</div>
            </div>
            <div className="col">
              <div className="row fs-5 fw-bold">Company</div>
              <div className="row">About us</div>
              <div className="row">Careers</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="">Frontend Practice © Copyright 2023</div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default HomeCompoment;
