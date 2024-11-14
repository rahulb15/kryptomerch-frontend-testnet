/* eslint-disable */
import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { useEffect, useState } from "react";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import userService from "src/services/user.service";
import { toast } from "react-toastify";

const PersonalInformation = (props) => {
    console.log("🚀 ~ PersonalInformation ~ props:", props);
    const [countryid, setCountryid] = useState(0);
    console.log("🚀 ~ PersonalInformation ~ countryid:", countryid);
    const [stateid, setstateid] = useState(0);
    console.log("🚀 ~ PersonalInformation ~ stateid:", stateid);
    const [userInformation, setUserInformation] = useState({
        name: "",
        email: "",
        bio: "",
        phone: "",
        gender: "",
        address: {
            address1: "",
            address2: "",
            country: "",
            state: "",
            city: "",
            zip: "",
        },
    });

    const onChangeHandler = (e) => {
        console.log("🚀 ~ onChangeHandler ~ e.target.name:", e.target.name);
        console.log("🚀 ~ onChangeHandler ~ e.target.value:", e.target.value);

        setUserInformation({
            ...userInformation,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (props.user) {
            setUserInformation({
                name: props.user.name || "",
                email: props.user.email || "",
                bio: props.user.bio || "",
                phone: props.user.phone ? props.user.phone.toString() : "",
                gender: props.user.gender || "",
                address: {
                    address1: props.user.address?.address1 || "",
                    address2: props.user.address?.address2 || "",
                    country: props.user.address?.country || {},
                    state: props.user.address?.state || {},
                    city: props.user.address?.city || {},
                    zip: props.user.address?.zip || "",
                },
            });
        }
    }, [props.user]);

    console.log("🚀 ~ PersonalInformation ~ userInformation", userInformation);

    const onSubmitHandler = async () => {
        console.log("🚀 ~ onSubmitHandler ~ userInformation", userInformation);
        await userService
            .updateUser(userInformation)
            .then((response) => {
                console.log("🚀 ~ onSubmitHandler ~ response", response);
                if (response?.data?.status === "success") {
                    toast.success("User Updated Successfully");
                }
            })
            .catch((error) => {
                console.log("🚀 ~ onSubmitHandler ~ error", error);
                toast.error("Something went wrong");
            });
    };

    return (
        <div className="kryptomerch-information">
            <div className="profile-form-wrapper">
                <div className="input-two-wrapper mb--15">
                    <div className="first-name half-wid">
                        <label htmlFor="contact-name" className="form-label">
                            User Name
                        </label>
                        <input
                            name="name"
                            id="Name"
                            type="text"
                            value={userInformation.name}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                    <div className="last-name half-wid">
                        <label htmlFor="Email" className="form-label">
                            Edit Your Email
                        </label>
                        <input
                            name="email"
                            id="Email"
                            type="email"
                            value={userInformation.email}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                </div>
                <div className="email-area">
                    <label htmlFor="Email" className="form-label">
                        Wallet Address
                    </label>
                    <input
                        name="wallet-address"
                        id="WalletAddress"
                        type="wallet-address"
                        disabled
                        value={props?.user?.walletAddress}
                        // onChange={(e) => e}
                    />
                </div>
            </div>
            <div className="edit-bio-area mt--30">
                <label htmlFor="Discription" className="form-label">
                    Edit Your Bio
                </label>
                <textarea
                    id="Discription"
                    value={userInformation.bio}
                    name="bio"
                    onChange={(e) => onChangeHandler(e)}
                    placeholder="Write something about you"
                />
            </div>

            <div className="input-two-wrapper mt--15">
                <div className="half-wid phone-number">
                    <label htmlFor="PhoneNumber" className="form-label mb--10">
                        Phone Number
                    </label>
                    <input
                        name="phone"
                        id="Phone"
                        type="number"
                        value={userInformation.phone}
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
                <div className="half-wid gender">
                    <NiceSelect
                        options={[
                            { value: "male", text: "male" },
                            { value: "female", text: "female" },
                        ]}
                        placeholder="Select Your Gender"
                        className="profile-edit-select"
                        defaultCurrent={userInformation?.gender}
                        onChange={(e) => {
                            setUserInformation({
                                ...userInformation,
                                gender: e.value,
                            });
                        }}
                    />
                </div>
            </div>

            {/* MArgin top blank div */}
            {/* <div className="mt--25"></div> */}

            <div className="email-area mt--25">
                <label htmlFor="Email" className="form-label">
                    Address Line 1
                </label>
                <input
                    name="address1"
                    id="address1"
                    type="address1"
                    value={userInformation?.address?.address1}
                    onChange={(e) => {
                        setUserInformation({
                            ...userInformation,
                            address: {
                                ...userInformation.address,
                                address1: e.target.value,
                            },
                        });
                    }}
                />
            </div>
            <div className="email-area mt--25">
                <label htmlFor="Email" className="form-label">
                    Address Line 2
                </label>
                <input
                    name="address2"
                    id="address2"
                    type="address2"
                    value={userInformation?.address?.address2}
                    onChange={(e) => {
                        setUserInformation({
                            ...userInformation,
                            address: {
                                ...userInformation.address,
                                address2: e.target.value,
                            },
                        });
                    }}
                />
            </div>

            <div className="input-two-wrapper mt--15">
                <div className="half-wid">
                    <label htmlFor="Country" className="form-label mb--10">
                        Country
                    </label>
                    <CountrySelect
                        defaultValue={userInformation?.address?.country}
                        onChange={(e) => {
                            setCountryid(e.id);
                            setUserInformation({
                                ...userInformation,
                                address: {
                                    ...userInformation.address,
                                    country: e,
                                },
                            });
                        }}
                        placeHolder="Select Country"
                    />
                </div>

                <div className="half-wid">
                    <label htmlFor="State" className="form-label mb--10">
                        State
                    </label>
                    <StateSelect
                        countryid={countryid}
                        defaultValue={userInformation?.address?.state}
                        onChange={(e) => {
                            setstateid(e.id);
                            setUserInformation({
                                ...userInformation,
                                address: {
                                    ...userInformation.address,
                                    state: e,
                                },
                            });
                        }}
                        placeHolder="Select State"
                    />
                </div>

                <div className="half-wid">
                    <label htmlFor="City" className="form-label mb--10">
                        City
                    </label>
                    <CitySelect
                        countryid={countryid}
                        stateid={stateid}
                        defaultValue={userInformation?.address?.city}
                        onChange={(e) => {
                            setUserInformation({
                                ...userInformation,
                                address: {
                                    ...userInformation.address,
                                    city: e,
                                },
                            });
                        }}
                        placeHolder="Select City"
                    />
                </div>
            </div>

            <div className="button-area save-btn-edit">
                <Button className="mr--15" color="primary-alta" size="medium">
                    Cancel
                </Button>
                <Button size="medium" onClick={onSubmitHandler}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default PersonalInformation;
