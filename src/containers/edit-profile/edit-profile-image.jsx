// /* eslint-disable */
// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import userService from "src/services/user.service";
// // import { toast } from "react-toastify";
// // import Loader from "@components/loader";

// // const EditProfileImage = (props) => {
// //     const [selectedImage, setSelectedImage] = useState({
// //         profileImage: "",
// //         coverImage: "",
// //     });
// //     const [loadingCover, setLoadingCover] = useState(false);
// //     const [loadingProfile, setLoadingProfile] = useState(false);
// //     const imageChange = (e) => {
// //         const name = e.target.name;
// //         const file = e.target.files[0];
// //         console.log("🚀 ~ EditProfileImage ~ file", file);
// //         console.log("🚀 ~ imageChange ~ name:", name);
// //         uploadImage(name, file);
// //     };

// //     console.log("🚀 ~ EditProfileImage ~ selectedImage:", selectedImage);
// //     const uploadImage = async (name, file) => {
// //         console.log("🚀 ~ uploadImage ~ name:", name);
// //         console.log("🚀 ~ uploadImage ~ file:", file);
// //         try {
// //             if (name === "profileImage") {
// //                 setLoadingProfile(true);
// //             }
// //             if (name === "coverImage") {
// //                 setLoadingCover(true);
// //             }

// //             const formData = new FormData();
// //             formData.append(name, file);
// //             const response = await userService.uploadImage(formData);
// //             console.log("🚀 ~ uploadImage ~ response", response);
// //             if (response?.data?.status === "success") {
// //                 toast.success("Image Uploaded Successfully");
// //                 if (name === "profileImage") {
// //                     setSelectedImage((prev) => ({
// //                         ...prev,
// //                         profileImage: URL.createObjectURL(file),
// //                     }));
// //                     setLoadingProfile(false);
// //                 }
// //                 if (name === "coverImage") {
// //                     setSelectedImage((prev) => ({
// //                         ...prev,
// //                         coverImage: URL.createObjectURL(file),
// //                     }));
// //                     setLoadingCover(false);
// //                 }
// //             }
// //         } catch (error) {
// //             console.log("🚀 ~ uploadImage ~ error", error);
// //             toast.error("Image Upload Failed");
// //             setLoadingProfile(false);
// //             setLoadingCover(false);
// //         }
// //     };

// //     useEffect(() => {
// //         console.log("🚀 ~ EditProfileImage ~ props", props?.user?.coverImage);
// //         if (props?.user?.coverImage) {
// //             setSelectedImage((prev) => ({
// //                 ...prev,
// //                 coverImage: props.user?.coverImage,
// //             }));
// //         }
// //         if (props?.user?.profileImage) {
// //             setSelectedImage((prev) => ({
// //                 ...prev,
// //                 profileImage: props.user?.profileImage,
// //             }));
// //         }
// //     }, [props?.user]);

// //     console.log("🚀 ~ EditProfileImage ~ selectedImage", selectedImage);

// //     return (
// //         <div className="kryptomerch-information">
// //             <div className="profile-change row g-5">
// //                 <div className="profile-left col-lg-4">
// //                     <div className="profile-image mb--30">
// //                         <h6 className="title">Change Your Profile Picture</h6>
// //                         <div className="img-wrap">
// //                             {selectedImage.profileImage ? (
// //                                 <img
// //                                     src={selectedImage.profileImage}
// //                                     alt=""
// //                                     data-black-overlay="6"
// //                                 />
// //                             ) : (
// //                                 <Image
// //                                     id="rbtinput1"
// //                                     src="/images/profile/profile-01.jpg"
// //                                     alt="Profile-NFT"
// //                                     priority
// //                                     fill
// //                                     sizes="100vw"
// //                                     style={{
// //                                         objectFit: "cover",
// //                                     }}
// //                                 />
// //                             )}
// //                         </div>
// //                     </div>
// //                     <div className="button-area">
// //                         <div className="brows-file-wrapper">
// //                             <input
// //                                 name="profileImage"
// //                                 id="fatima"
// //                                 type="file"
// //                                 onChange={imageChange}
// //                             />
// //                             <label htmlFor="fatima" title="No File Choosen">
// //                                 <span className="text-center color-white">
// //                                     Upload Profile
// //                                 </span>
// //                             </label>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="profile-left right col-lg-8">
// //                     <div className="profile-image mb--30">
// //                         <h6 className="title">Change Your Cover Photo</h6>
// //                         <div className="img-wrap">
// //                             {selectedImage.coverImage ? (
// //                                 <img
// //                                     src={selectedImage.coverImage}
// //                                     alt=""
// //                                     data-black-overlay="6"
// //                                 />
// //                             ) : (
// //                                 <Image
// //                                     id="rbtinput2"
// //                                     src="/images/profile/cover-01.jpg"
// //                                     alt="Profile-NFT"
// //                                     priority
// //                                     fill
// //                                     sizes="100vw"
// //                                     style={{
// //                                         objectFit: "cover",
// //                                     }}
// //                                 />
// //                             )}
// //                         </div>
// //                     </div>
// //                     <div className="button-area">
// //                         <div className="brows-file-wrapper">
// //                             <input
// //                                 name="coverImage"
// //                                 id="nipa"
// //                                 type="file"
// //                                 onChange={imageChange}
// //                             />
// //                             <label htmlFor="nipa" title="No File Choosen">
// //                                 <span className="text-center color-white">
// //                                     Upload Cover
// //                                 </span>
// //                             </label>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default EditProfileImage;




// import { useState, useEffect, useContext } from "react";
// import Image from "next/image";
// import userService from "src/services/user.service";
// import { toast } from "react-toastify";
// import Loader from "@components/loader";
// import { AccountContext } from "src/contexts/AccountContext";

// const EditProfileImage = (props) => {
//     const { user, refreshUserData } = useContext(AccountContext);
//     const [selectedImage, setSelectedImage] = useState({
//         profileImage: "",
//         coverImage: "",
//     });
//     const [loadingCover, setLoadingCover] = useState(false);
//     const [loadingProfile, setLoadingProfile] = useState(false);

//     const imageChange = (e) => {
//         const name = e.target.name;
//         const file = e.target.files[0];
//         uploadImage(name, file);
//     };

//     const uploadImage = async (name, file) => {
//         try {
//             if (name === "profileImage") {
//                 setLoadingProfile(true);
//             }
//             if (name === "coverImage") {
//                 setLoadingCover(true);
//             }

//             const formData = new FormData();
//             formData.append(name, file);
//             const response = await userService.uploadImage(formData);
//             if (response?.data?.status === "success") {
//                 toast.success("Image Uploaded Successfully");
//                 setSelectedImage((prev) => ({
//                     ...prev,
//                     [name]: URL.createObjectURL(file),
//                 }));
//                 await refreshUserData();
//             }
//         } catch (error) {
//             console.error("Image upload failed:", error);
//             toast.error("Image Upload Failed");
//         } finally {
//             setLoadingProfile(false);
//             setLoadingCover(false);
//         }
//     };

//     useEffect(() => {
//         if (props?.user?.coverImage) {
//             setSelectedImage((prev) => ({
//                 ...prev,
//                 coverImage: props.user.coverImage,
//             }));
//         }
//         if (props?.user?.profileImage) {
//             setSelectedImage((prev) => ({
//                 ...prev,
//                 profileImage: props.user.profileImage,
//             }));
//         }
//     }, [props?.user]);

//     return (
//         <div className="kryptomerch-information">
//             <div className="profile-change row g-5">
//                 <div className="profile-left col-lg-4">
//                     <div className="profile-image mb--30">
//                         <h6 className="title">Change Your Profile Picture</h6>
//                         <div className="img-wrap" style={{ position: 'relative' }}>
//                             {loadingProfile ? (
//                                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                                     <Loader />
//                                 </div>
//                             ) : selectedImage.profileImage ? (
//                                 <img
//                                     src={selectedImage.profileImage}
//                                     alt="Profile"
//                                     data-black-overlay="6"
//                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 />
//                             ) : (
//                                 <Image
//                                     id="rbtinput1"
//                                     src="/assets-images/NoDATA/noimage.jpg"
//                                     alt="Profile-NFT"
//                                     priority
//                                     fill
//                                     sizes="100vw"
//                                     style={{ objectFit: "cover" }}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                     <div className="button-area">
//                         <div className="brows-file-wrapper">
//                             <input
//                                 name="profileImage"
//                                 id="fatima"
//                                 type="file"
//                                 onChange={imageChange}
//                             />
//                             <label htmlFor="fatima" title="No File Chosen">
//                                 <span className="text-center color-white">
//                                     Upload Profile
//                                 </span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="profile-left right col-lg-8">
//                     <div className="profile-image mb--30">
//                         <h6 className="title">Change Your Cover Photo</h6>
//                         <div className="img-wrap" style={{ position: 'relative' }}>
//                             {loadingCover ? (
//                                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                                     <Loader />
//                                 </div>
//                             ) : selectedImage.coverImage ? (
//                                 <img
//                                     src={selectedImage.coverImage}
//                                     alt="Cover"
//                                     data-black-overlay="6"
//                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 />
//                             ) : (
//                                 <Image
//                                     id="rbtinput2"
//                                     src="/assets-images/NoDATA/Designer1.jpeg"
//                                     alt="Profile-NFT"
//                                     priority
//                                     fill
//                                     sizes="100vw"
//                                     style={{ objectFit: "cover" }}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                     <div className="button-area">
//                         <div className="brows-file-wrapper">
//                             <input
//                                 name="coverImage"
//                                 id="nipa"
//                                 type="file"
//                                 onChange={imageChange}
//                             />
//                             <label htmlFor="nipa" title="No File Chosen">
//                                 <span className="text-center color-white">
//                                     Upload Cover
//                                 </span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProfileImage;




import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@components/loader";
import { AccountContext } from "src/contexts/AccountContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditProfileImage = (props) => {
    const { user, refreshUserData } = useContext(AccountContext);
    const [selectedImage, setSelectedImage] = useState({
        profileImage: "",
        coverImage: "",
    });
    const [loadingCover, setLoadingCover] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({
        profileImage: 0,
        coverImage: 0,
    });

    const imageChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        uploadImage(name, file);
    };

    const uploadImage = async (name, file) => {
        const formData = new FormData();
        formData.append(name, file);

        try {
            setUploadProgress(prev => ({ ...prev, [name]: 0 }));
            if (name === "profileImage") setLoadingProfile(true);
            if (name === "coverImage") setLoadingCover(true);

            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_URL}user/upload-image-user`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(prev => ({ ...prev, [name]: percentCompleted }));
                    },
                }
            );

            if (response?.data?.status === "success") {
                toast.success("Image Uploaded Successfully");
                setSelectedImage(prev => ({
                    ...prev,
                    [name]: URL.createObjectURL(file),
                }));
                await refreshUserData();
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Image Upload Failed");
        } finally {
            setLoadingProfile(false);
            setLoadingCover(false);
            setUploadProgress(prev => ({ ...prev, [name]: 0 }));
        }
    };

    useEffect(() => {
        if (props?.user?.coverImage) {
            setSelectedImage(prev => ({
                ...prev,
                coverImage: props.user.coverImage,
            }));
        }
        if (props?.user?.profileImage) {
            setSelectedImage(prev => ({
                ...prev,
                profileImage: props.user.profileImage,
            }));
        }
    }, [props?.user]);

    return (
        <div className="kryptomerch-information">
            <div className="profile-change row g-5">
                <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap" style={{ position: 'relative' }}>
                            {loadingProfile ? (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Loader />
                                    {uploadProgress.profileImage > 0 && (
                                        <div>Uploading: {uploadProgress.profileImage}%</div>
                                    )}
                                </div>
                            ) : selectedImage.profileImage ? (
                                <img
                                    src={selectedImage.profileImage}
                                    alt="Profile"
                                    data-black-overlay="6"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Image
                                    id="rbtinput1"
                                    src="/assets-images/NoDATA/noimage.jpg"
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profileImage"
                                id="fatima"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="fatima" title="No File Chosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="profile-left right col-lg-8">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap" style={{ position: 'relative' }}>
                            {loadingCover ? (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Loader />
                                    {uploadProgress.coverImage > 0 && (
                                        <div>Uploading: {uploadProgress.coverImage}%</div>
                                    )}
                                </div>
                            ) : selectedImage.coverImage ? (
                                <img
                                    src={selectedImage.coverImage}
                                    alt="Cover"
                                    data-black-overlay="6"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Image
                                    id="rbtinput2"
                                    src="/assets-images/NoDATA/Designer1.jpeg"
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="coverImage"
                                id="nipa"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="nipa" title="No File Chosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileImage;