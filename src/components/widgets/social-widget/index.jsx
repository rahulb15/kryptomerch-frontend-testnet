import PropTypes from "prop-types";

const SocialWidget = ({ socials }) => (
    <ul className="social-copyright">
        {console.log(socials)}
        {socials?.map((social) => (
            <li key={social.id}>
                <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.title}
                >
                    <i className={social.icon} />
                </a>
            </li>
        ))}
    </ul>
);

SocialWidget.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
};

export default SocialWidget;


// import React from "react";
// import {
//     EmailShareButton,
//     EmailIcon,
//     FacebookShareButton,
//     FacebookIcon,
//     LinkedinShareButton,
//     LinkedinIcon,
//     TwitterShareButton,
//     XIcon,
//     WhatsappShareButton,
//     WhatsappIcon,
// } from "react-share";
// import { Instagram } from "lucide-react";

// const SocialWidget = () => {
//     const socials = [
//         {
//             id: 1,
//             component: (
//                 <FacebookShareButton url="https://facebook.com">
//                     <FacebookIcon size={40} round />
//                 </FacebookShareButton>
//             ),
//             link: "https://facebook.com",
//             title: "Facebook"
//         },
//         {
//             id: 2,
//             component: (
//                 <TwitterShareButton url="https://twitter.com">
//                     <XIcon size={40} round />
//                 </TwitterShareButton>
//             ),
//             link: "https://twitter.com",
//             title: "Twitter"
//         },
//         {
//             id: 3,
//             component: (
//                 <a 
//                     href="https://instagram.com"
//                     target="_blank"
//                     rel="noreferrer"
//                     aria-label="Instagram"
//                 >
//                     <Instagram size={40} />
//                 </a>
//             ),
//             link: "https://instagram.com",
//             title: "Instagram"
//         },
//         {
//             id: 4,
//             component: (
//                 <LinkedinShareButton url="https://linkedin.com">
//                     <LinkedinIcon size={40} round />
//                 </LinkedinShareButton>
//             ),
//             link: "https://linkedin.com",
//             title: "LinkedIn"
//         },
//         {
//             id: 5,
//             component: (
//                 <EmailShareButton url="mailto:example@example.com">
//                     <EmailIcon size={40} round />
//                 </EmailShareButton>
//             ),
//             link: "mailto:example@example.com",
//             title: "Email"
//         },
//         {
//             id: 6,
//             component: (
//                 <WhatsappShareButton url="https://whatsapp.com">
//                     <WhatsappIcon size={40} round />
//                 </WhatsappShareButton>
//             ),
//             link: "https://whatsapp.com",
//             title: "WhatsApp"
//         }
//     ];

//     return (
//         <ul className="social-copyright">
//             {socials.map((social) => (
//                 <li key={social.id}>
//                     {social.component}
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default SocialWidget;
