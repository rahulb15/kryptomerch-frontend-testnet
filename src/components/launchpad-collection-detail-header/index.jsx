// import PropTypes from "prop-types";
// import clsx from "clsx";
// import Anchor from "@ui/anchor";
// import {
//     EmailShareButton,
//     EmailIcon,
//     FacebookShareButton,
//     FacebookIcon,
//     LinkedinShareButton,
//     LinkedinIcon,
//     TelegramShareButton,
//     TelegramIcon,
//     TwitterShareButton,
//     XIcon,
//     WhatsappIcon,
//     WhatsappShareButton,
// } from "react-share";
// const LaunchpadCollectionDetailHeader = ({ pageTitle, data, className, space }) => (
//     console.log(data),
//     <div
//         className={clsx(
//             "rn-breadcrumb-inner",
//             className,
//             space === 1 && "ptb--10"
//         )}
//     >
//         <div className="container">
//             <div className="row align-items-center">
//                 <div className="col-lg-6 col-md-6 col-12">
//                     <h5 className="pageTitle text-center text-md-start">
//                         Collections / {pageTitle}
//                     </h5>
//                 </div>
//                 <div className="col-lg-6 col-md-6 col-12">
//                     <ul className="breadcrumb-list gap-5 text-center text-md-end">
//                         {/* <li className="item">
                            
//                         </li> */}
//                         {/* <li className="separator">
//                         </li> */}
//                         {/* <li className="item current">
//                         </li> */}

//                         {/* <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <span>Buy Now</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span>
//                         </li> */}
//                         {/* <li className="item current"
//                         style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                         >
//                             <span>Sell Now</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span>
//                         </li> */}
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Listed/Supply</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             {/* <a href="#!">
//                         <span className="icon">
//                             <i className="feather-facebook" />
//                         </span> */}

//                             {/* </a> */}

//                             <FacebookShareButton
//                                 url={"https://www.facebook.com"}
//                                 quote={"Facebook share button"}
//                                 hashtag="#facebook"
//                             >
//                                 <FacebookIcon size={32} round />
//                             </FacebookShareButton>
//                         </li>
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Volume[24h]</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             <TwitterShareButton
//                                 url={"https://www.twitter.com"}
//                                 title={"Twitter share button"}
//                                 hashtags={["twitter"]}
//                             >
//                                 <XIcon size={32} round />
//                             </TwitterShareButton>


//                         </li>
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Volume[24h]</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             <WhatsappShareButton
//                                 url={"https://www.whatsapp.com"}
//                                 title={"Whatsapp share button"}
//                             >
//                                 <WhatsappIcon size={32} round />
//                             </WhatsappShareButton>


//                         </li>
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Volume[all]</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             <TelegramShareButton
//                                 url={"https://www.telegram.com"}
//                                 title={"Telegram share button"}
//                             >
//                                 <TelegramIcon size={32} round />
//                             </TelegramShareButton>

//                         </li>
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Sales</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             <LinkedinShareButton
//                                 url={"https://www.linkedin.com"}
//                                 title={"Linkedin share button"}
//                                 summary={"Linkedin share button"}
//                             >
//                                 <LinkedinIcon size={32} round />
//                             </LinkedinShareButton>

//                         </li>
//                         <li
//                             className="item current"
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* <span>Price</span>
//                             <span
//                                 style={{
//                                     fontSize: "12px",
//                                     fontWeight: "600",
//                                     marginTop: "5px",
//                                 }}
//                             >
//                                 20
//                             </span> */}
//                             <EmailShareButton
//                                 url={"https://www.email.com"}
//                                 subject={"Email share button"}
//                                 body={"Email share button"}
//                             >
//                                 <EmailIcon size={32} round />
//                             </EmailShareButton>

//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// LaunchpadCollectionDetailHeader.propTypes = {
//     pageTitle: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(PropTypes.object).isRequired,
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1]),
// };

// LaunchpadCollectionDetailHeader.defaultProps = {
//     space: 1,
// };

// export default LaunchpadCollectionDetailHeader;




// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import {
//     EmailShareButton,
//     EmailIcon,
//     FacebookShareButton,
//     FacebookIcon,
//     LinkedinShareButton,
//     LinkedinIcon,
//     TelegramShareButton,
//     TelegramIcon,
//     TwitterShareButton,
//     XIcon,
//     WhatsappShareButton,
//     WhatsappIcon,
// } from "react-share";
// import { Instagram } from "lucide-react";

// const SocialShareButton = ({ Button, Icon, url, title, ...props }) => (
//     <Button url={url} title={title} {...props}>
//         <Icon size={32} round />
//     </Button>
// );

// const InstagramShareButton = ({ url }) => (
//     <a href={`https://instagram.com/share?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
//         <Instagram size={32} />
//     </a>
// );

// const LaunchpadCollectionDetailHeader = ({ pageTitle, data, className, space }) => {
//     console.log(data);
//     const socialLinks = [
//         { name: 'facebook', Button: FacebookShareButton, Icon: FacebookIcon, url: data.facebook },
//         { name: 'twitter', Button: TwitterShareButton, Icon: XIcon, url: data.twitter },
//         { name: 'whatsapp', Button: WhatsappShareButton, Icon: WhatsappIcon, url: data.whatsapp },
//         { name: 'telegram', Button: TelegramShareButton, Icon: TelegramIcon, url: data.telegram },
//         { name: 'linkedin', Button: LinkedinShareButton, Icon: LinkedinIcon, url: data.linkedin },
//         { name: 'email', Button: EmailShareButton, Icon: EmailIcon, url: data.email },
//         { name: 'instagram', Button: InstagramShareButton, Icon: Instagram, url: data.instagram },
//     ];

//     return (
//         <div className={clsx("rn-breadcrumb-inner", className, space === 1 && "ptb--10")}>
//             <div className="container">
//                 <div className="row align-items-center">
//                     <div className="col-lg-6 col-md-6 col-12">
//                         <h5 className="pageTitle text-center text-md-start">
//                             Collections / {pageTitle}
//                         </h5>
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-12">
//                         <ul className="breadcrumb-list gap-5 text-center text-md-end">
//                             {socialLinks.map((social) => (
//                                 social.url && (
//                                     <li key={social.name} className="item current">
//                                         <SocialShareButton
//                                             Button={social.Button}
//                                             Icon={social.Icon}
//                                             url={social.url}
//                                             title={`Check out this ${pageTitle} collection!`}
//                                         />
//                                     </li>
//                                 )
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// LaunchpadCollectionDetailHeader.propTypes = {
//     pageTitle: PropTypes.string.isRequired,
//     data: PropTypes.shape({
//         facebook: PropTypes.string,
//         twitter: PropTypes.string,
//         whatsapp: PropTypes.string,
//         telegram: PropTypes.string,
//         linkedin: PropTypes.string,
//         email: PropTypes.string,
//         instagram: PropTypes.string,
//     }).isRequired,
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1]),
// };

// LaunchpadCollectionDetailHeader.defaultProps = {
//     space: 1,
// };

// export default LaunchpadCollectionDetailHeader;

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    XIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";
import { Instagram } from "lucide-react";

const SocialShareButton = ({ Button, Icon, url, title, ...props }) => (
    <Button url={url} title={title} {...props}>
        <Icon size={32} round />
    </Button>
);

const InstagramShareButton = ({ url }) => (
    <a href={`https://instagram.com/share?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        <Instagram size={32} />
    </a>
);

const LaunchpadCollectionDetailHeader = ({ pageTitle, data, className, space }) => {
    console.log(data);
    const socialLinks = [
        { name: 'facebook', Button: FacebookShareButton, Icon: FacebookIcon, url: data.socialMediaLinks?.facebook || data.facebook },
        { name: 'X', Button: TwitterShareButton, Icon: XIcon, url: data.socialMediaLinks?.X || data.X },
        { name: 'whatsapp', Button: WhatsappShareButton, Icon: WhatsappIcon, url: data.socialMediaLinks?.whatsapp || data.whatsapp },
        { name: 'telegram', Button: TelegramShareButton, Icon: TelegramIcon, url: data.socialMediaLinks?.telegram || data.telegram },
        { name: 'linkedin', Button: LinkedinShareButton, Icon: LinkedinIcon, url: data.socialMediaLinks?.linkedin || data.linkedin },
        { name: 'email', Button: EmailShareButton, Icon: EmailIcon, url: data.socialMediaLinks?.email || data.email },
        { name: 'instagram', Button: InstagramShareButton, Icon: Instagram, url: data.socialMediaLinks?.instagram || data.instagram },
    ];

    return (
        <div className={clsx("rn-breadcrumb-inner", className, space === 1 && "ptb--10")}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <h5 className="pageTitle text-center text-md-start">
                            Collections / {pageTitle}
                        </h5>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <ul className="breadcrumb-list gap-5 text-center text-md-end">
                            {socialLinks.map((social) => (
                                social.url && (
                                    <li key={social.name} className="item current">
                                        <SocialShareButton
                                            Button={social.Button}
                                            Icon={social.Icon}
                                            url={social.url}
                                            title={`Check out this ${pageTitle} collection!`}
                                        />
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

LaunchpadCollectionDetailHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    data: PropTypes.shape({
        socialMediaLinks: PropTypes.shape({
            facebook: PropTypes.string,
            twitter: PropTypes.string,
            whatsapp: PropTypes.string,
            telegram: PropTypes.string,
            linkedin: PropTypes.string,
            email: PropTypes.string,
            instagram: PropTypes.string,
        }),
        facebook: PropTypes.string,
        twitter: PropTypes.string,
        whatsapp: PropTypes.string,
        telegram: PropTypes.string,
        linkedin: PropTypes.string,
        email: PropTypes.string,
        instagram: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

LaunchpadCollectionDetailHeader.defaultProps = {
    space: 1,
};

export default LaunchpadCollectionDetailHeader;