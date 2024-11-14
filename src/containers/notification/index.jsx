import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import NiceSelect from "@ui/nice-select";
import NoticeCard from "@components/notice-card";
import { IDType, ImageType } from "@utils/types";
import useSocketIO from "./useSocketIO"; 


const ActivityNoticeCard = ({ activity }) => {
    const getActivityTitle = (type) => {
      switch (type) {
        case 'transfer': return 'NFT Transferred';
        case 'sale': return 'NFT Sold';
        // Add more cases as needed
        default: return 'NFT Activity';
      }
    };
  
    const getActivityDescription = (activity) => {
      switch (activity.activityType) {
        case 'transfer':
          return `${activity.nftTokenId} transferred from ${activity.fromAddress.slice(0, 6)}... to ${activity.toAddress.slice(0, 6)}...`;
        case 'sale':
          return `${activity.nftTokenId} sold for ${activity.price} ${activity.currency}`;
        // Add more cases as needed
        case 'bid':
            return `Bid placed on ${activity.nftTokenId}`;
        default:
          return `Activity on ${activity.nftTokenId}`;
      }
    };
  
    return (
      <NoticeCard
        title={getActivityTitle(activity.activityType)}
        description={getActivityDescription(activity)}
        path={`/nft-details/${activity.nftTokenId}`} // Adjust this path as needed
        date={new Date(activity.timestamp).toLocaleDateString()}
        time={new Date(activity.timestamp).toLocaleTimeString()}
        image={{ src: activity.nftImage, alt: activity.nftTokenId }}
      />
    );
  };

const NotificationArea = ({ data, collectionId }) => {
    const [current, setCurrent] = useState("newest");
    const [notifications, setNotifications] = useState([]);
    const { isConnected, activities, sendMessage } = useSocketIO(collectionId);
    console.log(isConnected, activities, sendMessage, "isConnected, activities, sendMessage");

    const changeHandler = (item) => {
        setCurrent(item.value);
    };

    const filterHandler = useCallback(() => {
        const allNotifications = [...activities]; // Remove data.notifications if not needed
        // You might want to adjust this filter based on your activity types
        const filteredNotifications = allNotifications.filter(
            (noti) => current === "newest" || noti.activityType === current.toLowerCase()
        );
        setNotifications(filteredNotifications);
    }, [current, activities]);

    useEffect(() => {
        filterHandler();
    }, [filterHandler]);

    useEffect(() => {
        if (isConnected) {
            sendMessage('subscribeToCollection', collectionId);
        }
        return () => {
            if (isConnected) {
                sendMessage('unsubscribeFromCollection', collectionId);
            }
        };
    }, [isConnected, collectionId, sendMessage]);

    return (
        <div className="rn-notification-area right-fix-notice">
        <div className="h--100">
            <div className="notice-heading">
                <h4>Notification</h4>
                <NiceSelect
                    options={[
                        { value: "newest", text: "Newest" },
                        { value: "transfer", text: "Transfers" },
                        { value: "sale", text: "Sales" },
                        // Add more options based on your activity types
                    ]}
                    defaultCurrent={0}
                    name="sellerSort"
                    onChange={changeHandler}
                />
            </div>
        </div>
        <div className="rn-notification-wrapper">
            {notifications.map((activity) => (
                <ActivityNoticeCard key={activity.id} activity={activity} />
            ))}
        </div>
    </div>
    );
};

NotificationArea.propTypes = {
    data: PropTypes.shape({
        notifications: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                title: PropTypes.string,
                description: PropTypes.string,
                path: PropTypes.string,
                date: PropTypes.string,
                time: PropTypes.string,
                image: ImageType,
            })
        ),
    }),
    collectionId: PropTypes.string.isRequired,
};

export default NotificationArea;