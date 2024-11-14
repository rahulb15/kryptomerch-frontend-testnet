// components/Canny.js
import { useEffect } from "react";

const Canny = ({ user }) => {
    console.log(user);
    useEffect(() => {
        if (window.Canny) {
            window.Canny("identify", {
                appID: "66851cf0a6f8ca329648fc15", // Replace with your actual Canny app ID
                user: {
                    email: user?.email,
                    name: user?.name,
                    id: user?._id,
                    avatarURL: user?.profileImage,
                    created: new Date(user?.createdAt)?.toISOString(),
                },
            });
        }
    }, [user]);

    return null;
};

export default Canny;
