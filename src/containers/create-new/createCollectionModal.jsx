import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import toast from "react-toastify";
import { Modal, Paper } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { IoIosClose } from "react-icons/io";

const fileTypes = ["JPEG", "PNG", "GIF"];

const CreateCollectionModal = ({ className, open, handleClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        if (!open) {
            reset();
            setSelectedImage(null);
            setPreviewImage(null);
        }
    }, [open, reset]);

    const handleChange = (file) => {
        if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(file);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Failed to load image. Please try again.");
        }
    };

    const onSubmit = (data, e) => {
        if (!selectedImage) {
            toast.error("Please upload an image.");
            return;
        }

        // Submit logic goes here
        toast.success("Collection created successfully.");
        reset();
        setSelectedImage(null);
        setPreviewImage(null);
    };

    const handleClearForm = () => {
        reset();
        setSelectedImage(null);
        setPreviewImage(null);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="collection-modal-title"
            aria-describedby="collection-modal-description"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                // whileHover={{ rotateY: 10 }}
            >
                <Paper
                    elevation={5}
                    style={{
                        padding: 10,
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        width: 500,
                        borderRadius: 15,
                        backgroundColor: "#1f1f1f",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                        transformStyle: "preserve-3d",
                        height: "auto",
                        overflowY: "auto",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IoIosClose
                            onClick={handleClose}
                            style={{
                                cursor: "pointer",
                                color: "#fff",
                                fontSize: 30,
                            }}
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-wrapper-one">
                            <div className="header-title text-center mb--10">
                                <h3>Create New Collection</h3>
                                <p>
                                    Create a new collection to group your NFTs
                                </p>
                            </div>

                            <div className="col-md-12 mb--10">
                                <div className="image-preview-box mb--10">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" />
                                    ) : (
                                        <div className="image-placeholder">
                                            <span>Image Preview</span>
                                        </div>
                                    )}
                                </div>

                                <div className="image-upload-box">
                                    <FileUploader
                                        multiple={false}
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-box">
                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            placeholder="e.g. `Digital Awesome Game`"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />
                                        {errors.name && (
                                            <ErrorText>
                                                {errors.name?.message}
                                            </ErrorText>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-12 mb--20 mt--10">
                                    <div className="input-box">
                                        <label
                                            htmlFor="supply"
                                            className="form-label"
                                        >
                                            Supply
                                        </label>
                                        <input
                                            id="supply"
                                            placeholder="e.g. `20`"
                                            {...register("supply", {
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message:
                                                        "Please enter a number",
                                                },
                                                required: "Supply is required",
                                            })}
                                        />
                                        {errors.supply && (
                                            <ErrorText>
                                                {errors.supply?.message}
                                            </ErrorText>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-12 text-center mt--10">
                                    <Button type="submit">
                                        Create Collection
                                    </Button>
                                    <Button
                                        type="button"
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: "gray",
                                        }}
                                        onClick={handleClearForm}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Paper>
            </motion.div>
        </Modal>
    );
};

export default CreateCollectionModal;
