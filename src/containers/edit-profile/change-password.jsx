import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { AccountContext } from "src/contexts/AccountContext";

const ChangePassword = () => {
    const { user, refreshUserData } = useContext(AccountContext);
    console.log("🚀 ~ ChangePassword ~ user", user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        watch,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange", // Validates on each change
    });

    const notify = () => toast("Your password has changed");

    const onSubmit = (_data, e) => {
        e.preventDefault();
        console.log("🚀 ~ onSubmit ~ _data", _data);
        // notify();
        // reset();
    };

    useEffect(() => {
        if (user?.email) {
            reset({
                email: user.email,
            });
        }
    }, [user]);

    // Watch password fields
    const newPassword = watch("NewPass");
    const oldPassword = watch("oldPass");
    const rePassword = watch("rePass");

    // Validate that the new password is not the same as the old password
    useEffect(() => {
        if (newPassword && oldPassword && newPassword === oldPassword) {
            setError("NewPass", {
                type: "manual",
                message: "New password and old password cannot be the same",
            });
        } else if (newPassword !== oldPassword) {
            clearErrors("NewPass");
        }
    }, [newPassword, oldPassword, setError, clearErrors]);

    // Validate that the new password matches the confirmation password
    useEffect(() => {
        if (newPassword && rePassword && newPassword !== rePassword) {
            setError("rePass", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            clearErrors("rePass");
        }
    }, [newPassword, rePassword, setError, clearErrors]);

    return (
        <div className="kryptomerch-information">
            <div className="condition">
                <h5 className="title">Create Your Password</h5>
                <p className="condition">
                    Passwords are a critical part of information and network
                    security. Passwords serve to protect user accounts but a
                    poorly chosen password, if compromised, could put the entire
                    network at risk.
                </p>
                <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="email-area">
                    <label htmlFor="Email2" className="form-label">
                        Enter Email
                    </label>
                    <input
                        id="Email2"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>{errors.email?.message}</ErrorText>
                    )}
                </div>
                <div className="input-two-wrapper mt--15">
                    <div className="old-password half-wid">
                        <label htmlFor="oldPass" className="form-label">
                            Enter Old Password
                        </label>
                        <input
                            id="oldPass"
                            type="password"
                            {...register("oldPass", {
                                required: "Old Password is required",
                            })}
                        />
                        {errors.oldPass && (
                            <ErrorText>{errors.oldPass?.message}</ErrorText>
                        )}
                    </div>
                    <div className="new-password half-wid">
                        <label htmlFor="NewPass" className="form-label">
                            Create New Password
                        </label>
                        <input
                            id="NewPass"
                            type="password"
                            {...register("NewPass", {
                                required: "New Password is required",
                            })}
                        />
                        {errors.NewPass && (
                            <ErrorText>{errors.NewPass?.message}</ErrorText>
                        )}
                    </div>
                </div>
                <div className="email-area mt--15">
                    <label htmlFor="rePass" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        id="rePass"
                        type="password"
                        {...register("rePass", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("NewPass") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.rePass && (
                        <ErrorText>{errors.rePass?.message}</ErrorText>
                    )}
                </div>
                <Button className="save-btn-edit" size="medium" type="submit">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
