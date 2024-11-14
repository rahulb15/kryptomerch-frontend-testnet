// import PropTypes from "prop-types";
// import clsx from "clsx";
// import Image from "next/image";
// import dayjs from "dayjs";
// import { ImageType } from "@utils/types";

// const BlogDetailsArea = ({ className, post }) => (
//     <div className={clsx("blog-details-area", className)}>
//         <div className="blog-content-top">
//             <h2 className="title">{post.title}</h2>
//             <span className="date">
//                 {dayjs(post.date).format("D MMM, YYYY")}
//             </span>
//         </div>
//         <div className="bd-thumbnail">
//             <div className="large-img mb--30">
//                 {post.image && (
//                     <Image
//                         className="w-100"
//                         src={post.image}
//                         alt="Blog Images"
//                         width={919}
//                         height={517}
//                         priority
//                     />
//                 )}
//             </div>
//         </div>
//         <div
//             className="news-details"
//             dangerouslySetInnerHTML={{ __html: post.content }}
//         />
//     </div>
// );

// BlogDetailsArea.propTypes = {
//     className: PropTypes.string,
//     post: PropTypes.shape({
//         title: PropTypes.string,
//         date: PropTypes.string,
//         image: ImageType,
//         content: PropTypes.string,
//     }),
// };

// export default BlogDetailsArea;

import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import dayjs from "dayjs";
import { useState } from "react";
import { ImageType } from "@utils/types";
import { ThumbUpAlt, ThumbDownAlt, Share } from "@mui/icons-material";
import { IconButton, Typography, Box, Snackbar } from "@mui/material";
// import ShareOnSocial from "react-share-on-social";

const BlogDetailsArea = ({ className, post }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    const handleLike = () => setLikes(likes + 1);
    const handleDislike = () => setDislikes(dislikes + 1);

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: post.title,
                    text: "Check out this blog post!",
                    url: window.location.href,
                })
                .then(() => {
                    console.log("Successfully shared");
                })
                .catch((error) => {
                    console.error("Error sharing:", error);
                });
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard.writeText(window.location.href);
            setSnackbarOpen(true);
        }
    };









    return (
        <div className={clsx("blog-details-area", className)}>
            <div className="blog-content-top">
                <h2 className="title">{post.title}</h2>
                <span className="date">
                    {dayjs(post.date).format("D MMM, YYYY")}
                </span>
            </div>
            <div className="bd-thumbnail">
                <div className="large-img mb--30">
                    {post.image && (
                        <Image
                            className="w-100"
                            src={post.image}
                            alt="Blog Images"
                            width={919}
                            height={517}
                            priority
                        />
                    )}
                </div>
            </div>
            <div
                className="news-details"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton onClick={handleLike} color="primary">
                        <ThumbUpAlt sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Typography component="span" sx={{ fontSize: 16 }}>
                        {likes}
                    </Typography>
                    <IconButton
                        onClick={handleDislike}
                        color="secondary"
                        sx={{ ml: 2 }}
                    >
                        <ThumbDownAlt sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Typography component="span" sx={{ fontSize: 16 }}>
                        {dislikes}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleShare} color="primary">
                        <Share sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Typography component="span" sx={{ fontSize: 16 }}>
                        Share
                    </Typography>
                </Box>
            </Box>

            {/* <ShareOnSocial
                url={"https://www.google.com"}
                title={"Check out this blog post!"}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            /> */}




            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                sx={{
                    mb: 2,
                    borderRadius: 1,
                    backgroundColor: "#333",
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: 500,
                    textAlign: "center",
                }}
                onClose={() => setSnackbarOpen(false)}
                message="Link copied to clipboard!"
            />
        </div>
    );
};

BlogDetailsArea.propTypes = {
    className: PropTypes.string,
    post: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        image: ImageType,
        content: PropTypes.string,
    }),
};

export default BlogDetailsArea;
