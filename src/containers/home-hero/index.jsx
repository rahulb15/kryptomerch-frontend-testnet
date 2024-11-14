// /* eslint-disable */

// import PropTypes from "prop-types";
// import Button from "@ui/button";
// import Slider, { SliderItem } from "@ui/slider";
// import Image from "next/image";
// import { ButtonType, IDType, ImageType } from "@utils/types";

// const SliderOptions = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: false,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     fade: true,
//     infinite: true,
//     speed: 1000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     pauseOnFocus: true,
//     swipeToSlide: true,

//     // responsive: [
//     //     {
//     //         breakpoint: 992,
//     //         settings: {
//     //             arrows: false,
//     //         },
//     //     },
//     // ],
// };

// const HomeHeroArea = ({ data }) => (
//     <div className="rn-banner-area rn-section-gapTop">
//         <div className="container" style={{ width: "100%", marginTop: "-70px" }}>
//             {data && (
//                 <Slider
//                     options={SliderOptions}
//                     className="slider-style-6b wide-wrapper slick-activation-06 slick-arrow-between"
//                 >
//                     {data.map(
//                         (banner) => (
//                             console.log(banner.image.src),
//                             (
//                                 <SliderItem key={banner.id}>
//                                     <div className="slide">
//                                         {banner.image?.src && (
//                                             <Image
//                                                 src={banner.image.src}
//                                                 alt="Slider BG"
//                                                 quality={100}
//                                                 priority
//                                                 fill
//                                                 sizes="100vw"
//                                                 style={{
//                                                     objectFit: "cover",
//                                                 }}
//                                             />
//                                         )}

//                                         <div className="banner-read-thumb-lg">
//                                             <h4 className="banner-read-thumb-lg__title"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: banner?.title,
//                                                 }}
//                                             />
//                                             <p className="banner-read-thumb-lg__description"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: banner?.description,
//                                                 }}
//                                             />
//                                             {banner?.buttons && (
//                                                 <div className="button-group">
//                                                     {banner.buttons.map(
//                                                         (
//                                                             {
//                                                                 id,
//                                                                 content,
//                                                                 ...btn
//                                                             },
//                                                             i
//                                                         ) => (
//                                                             <Button
//                                                                 key={id}
//                                                                 data-sal="slide-up"
//                                                                 data-sal-delay="300"
//                                                                 data-sal-duration="800"
//                                                                 {...btn}
//                                                                 className={
//                                                                     i === 0
//                                                                         ? "mr--15"
//                                                                         : ""
//                                                                 }
//                                                             >
//                                                                 {content}
//                                                             </Button>
//                                                         )
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </SliderItem>
//                             )
//                         )
//                     )}
//                 </Slider>
//             )}
//         </div>
//     </div>
// );

// HomeHeroArea.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: IDType,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             buttons: PropTypes.arrayOf(ButtonType),
//             image: ImageType,
//         })
//     ),
// };

// export default HomeHeroArea;

import PropTypes from "prop-types";
import Button from "@ui/button";
import Slider, { SliderItem } from "@ui/slider";
import Image from "next/image";
import { ButtonType, IDType, ImageType } from "@utils/types";

const SliderOptions = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
};

const HomeHeroArea = ({ data }) => (
    <div className="rn-banner-area rn-section-gapTop">
        <div
            className="container"
            style={{ width: "100%", marginTop: "-70px" }}
        >
            {data && (
                <Slider
                    options={SliderOptions}
                    className="slider-style-6b wide-wrapper slick-activation-06 slick-arrow-between"
                >
                    {data.map((banner) => (
                        <SliderItem key={banner.id}>
                            <div className="slide">
                                <div className="image-wrapper">
                                    <div className="glow-wrapper">
                                        {banner.image?.src && (
                                            <Image
                                                src={banner.image.src}
                                                alt="Slider BG"
                                                quality={100}
                                                priority
                                                fill
                                                sizes="100vw"
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="banner-read-thumb-lg">
                                    <h4
                                        className="banner-read-thumb-lg__title"
                                        dangerouslySetInnerHTML={{
                                            __html: banner?.title,
                                        }}
                                    />
                                    <p
                                        className="banner-read-thumb-lg__description"
                                        dangerouslySetInnerHTML={{
                                            __html: banner?.description,
                                        }}
                                    />
                                    {banner?.buttons && (
                                        <div className="button-group">
                                            {banner.buttons.map(
                                                (
                                                    { id, content, ...btn },
                                                    i
                                                ) => (
                                                    <Button
                                                        key={id}
                                                        data-sal="slide-up"
                                                        data-sal-delay="300"
                                                        data-sal-duration="800"
                                                        {...btn}
                                                        className={
                                                            i === 0
                                                                ? "mr--15"
                                                                : ""
                                                        }
                                                    >
                                                        {content}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SliderItem>
                    ))}
                </Slider>
            )}
        </div>
    </div>
);

HomeHeroArea.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            buttons: PropTypes.arrayOf(ButtonType),
            image: ImageType,
        })
    ),
};

export default HomeHeroArea;
