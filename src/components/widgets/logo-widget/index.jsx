import PropTypes from "prop-types";
import LogoFooter from "@components/logo-footer";

const LogoWidget = ({ data }) => (
    <div className="footer-left">
        <LogoFooter logo={data.logo} />
        {data?.text && <p className="rn-footer-describe">{data.text}</p>}
    </div>
);

LogoWidget.propTypes = {
    data: PropTypes.shape({
        logo: PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.string.isRequired,
                alt: PropTypes.string,
            })
        ),
        text: PropTypes.string,
    }),
};

export default LogoWidget;
