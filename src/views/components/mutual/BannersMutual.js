function BannersMutual() {
  return (
    <div className="row">
      <div className="col-md-12 p-0">
        {/*<!-- Sliders HOME-->*/}
        <div id="slider-home" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="mt-2 pl-4 pb-2 rounded banner-slider-mutual">
                BANNER 1
              </div>
            </div>
            <div className="carousel-item">
              <div className="mt-2 pl-4 pb-2 rounded banner-slider-mutual">
                BANNER 2
              </div>
            </div>
            <div className="carousel-item">
              <div className="mt-2 pl-4 pb-2 rounded banner-slider-mutual">
                BANNER 3
              </div>
            </div>
          </div>
          <ol className="carousel-indicators">
            <li
              data-target="#slider-home"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#slider-home" data-slide-to="1"></li>
            <li data-target="#slider-home" data-slide-to="2"></li>
          </ol>
        </div>
        {/*<!-- FIN Sliders promociones -->*/}
      </div>
    </div>
  );
}

export default BannersMutual;
