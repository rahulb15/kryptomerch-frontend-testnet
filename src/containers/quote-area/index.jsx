import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import { TextType, SectionTitleType } from "@utils/types";
import Image from "next/image";

// data1= {
//     image: { src: '/assets-images/about-img.png' }
//   }

const QuoteArea = ({ space, className, data, data1 }) => (
    <div
        className={clsx(
            "rn-about-Quote-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        {console.log(data1)}
        <div className="container">
            <div className="row g-5 d-flex align-items-center">
                <div className="col-lg-6">
                    <div className="rn-about-title-wrapper">
                        {data?.section_title && (
                            <SectionTitle {...data.section_title} />
                        )}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div
                        className="rn-about-wrapper"
                        data-sal="slide-up"
                        data-sal-duration="800"
                        data-sal-delay="150"
                    >
                        {data?.texts?.map((text) => (
                            <p key={text.id}>{text.content}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div
                        className="quote-image"
                        data-sal="slide-up"
                        data-sal-duration="800"
                        data-sal-delay="150"
                        style={{
                            textAlign: "center",
                            marginTop: "50px",
                            marginBottom: "50px",
                            backgroundColor: "#cbd02e",
                            padding: "40px",
                            borderRadius: "10px",
                        }}
                    >
                        {data1?.image?.src && (
                            <img
                                src={data1.image.src}
                                alt={data1.image.alt || "quote"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

QuoteArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        texts: PropTypes.arrayOf(TextType),
    }),
};

QuoteArea.defaultProps = {
    space: 1,
};

export default QuoteArea;
