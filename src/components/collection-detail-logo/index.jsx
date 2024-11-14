import PropTypes from "prop-types";
import clsx from "clsx";

const Logo = ({ className, logoUrl, size = 100 }) => {
  console.log("🚀 ~ file: index.jsx ~ line 5 ~ Logo ~ logoUrl", logoUrl);
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
      }}
      className={clsx("logo-container", className)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <img
          src={logoUrl}
          alt="Logo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          className="logo-image"
        />
      </div>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  logoUrl: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Logo;