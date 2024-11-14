/* eslint-disable */
import ShareModal from "@components/modals/share-modal";
import { Avatar } from "@mui/material";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userService from "src/services/user.service";
const AuthorIntroArea = ({ className, space, data }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const [user, setUser] = useState({});
    const [reload, setReload] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const getUser = async () => {
        try {
            setReload(true);
            const userById = await userService.getUserDetail();
            console.log("🚀 ~ getUser ~ userById:", userById);
            setUser(userById.data.data);
            setReload(false);
        } catch (error) {
            console.log("🚀 ~ checkUser ~ error", error);
            toast.error("Something went wrong");
            setReload(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [refresh]);

    console.log("🚀 ~ AuthorIntroArea ~ user", user);

    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                {/* <Image
                    src="/images/bg/bg-image-9.jpg"
                    alt="Slider BG"
                    quality={100}
                    priority
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                    }}
                /> */}
                {user?.coverImage ? (
                    <Image
                        src={user?.coverImage}
                        alt="Slider BG"
                        quality={100}
                        priority
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <Image
                        src="/assets-images/NoDATA/Designer1.jpeg"
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
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
            >
                <div className="container">
                    <div className="row padding-tb-50 align-items-center d-flex">
                        <div className="col-lg-12">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {/* {data?.image?.src && (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={data.image.src}
                                                alt={
                                                    data.image?.alt || data.name
                                                }
                                                width={140}
                                                height={140}
                                            />
                                        </div>
                                    )} */}

                                    {user?.profileImage ? (
                                        <div className="user-thumbnail">
                                            {/* <Image
                                                src={user?.profileImage}
                                                alt={user?.name}
                                                width={140}
                                                height={140}
                                            /> */}
                                            <Avatar
                                                name={user?.name}
                                                src={user?.profileImage}
                                                sx={{
                                                    width: 140,
                                                    height: 140,
                                                    borderRadius: "0%",
                                                }}
                                            />
                                            
                                        </div>
                                    ) : (
                                        <>
                                            {data?.image?.src && (
                                                <div className="user-thumbnail">
                                                    {/* <Image
                                                        src="/assets-images/NoDATA/Designer1.jpeg"
                                                        alt={
                                                            data.image?.alt ||
                                                            data.name
                                                        }
                                                        width={140}
                                                        height={140}
                                                    /> */}
                                                    <Avatar
                                                        name={user?.name}
                                                        sx={{
                                                            width: 140,
                                                            height: 140,
                                                            borderRadius: "0%",
                                                            
                                                        }}
                                                        
                                                    />

                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="rn-author-info-content">
                                        <h4 className="title">
                                            {/* <Image
                                                src="/auth-images/verified.png"
                                                alt="Verified"
                                                style={{
                                                    marginRight: "5px",
                                                }}
                                                width={20}
                                                height={20}
                                            /> */}

                                            {user?.name}
                                        </h4>
                                        {/* <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="social-follw"
                                        >
                                            <i className="feather-twitter" />
                                            <span className="user-name">
                                                {data.twitter}
                                            </span>
                                        </a> */}
                                        <div className="follow-area">
                                            <div className="follow followers">
                                                <span>
                                                    {0}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        followers
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="follow following">
                                                <span>
                                                    {0}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        following
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="author-button-area">
                                            {/* <span className="btn at-follw follow-button">
                                                <i className="feather-user-plus" />
                                                Follow
                                            </span> */}
                                            <button
                                                type="button"
                                                className="btn at-follw share-button"
                                                onClick={shareModalHandler}
                                            >
                                                <i className="feather-share-2" />
                                            </button>

                                            {/* <div className="count at-follw">
                                                <ShareDropdown />
                                            </div> */}
                                            <Anchor
                                                path="/edit-profile"
                                                className="btn at-follw follow-button edit-btn"
                                            >
                                                <i className="feather feather-edit" />
                                            </Anchor>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AuthorIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        name: PropTypes.string,
        twitter: PropTypes.string,
        followers: PropTypes.string,
        following: PropTypes.string,
        image: ImageType,
    }),
};
AuthorIntroArea.defaultProps = {
    space: 1,
};

export default AuthorIntroArea;
