/* eslint-disable */
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import { useFlyoutSearch, useOffcanvas, useSticky } from "@hooks";
import Anchor from "@ui/anchor";
import BurgerButton from "@ui/burger-button";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { useAccountContext } from "src/contexts";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import menuleftData from "../../../data/general/menu-left.json";
import userService from "src/services/user.service";
import { NotificationProvider } from "src/contexts/NotificationContext";
import { ProfileBar } from "src/mat-components/ProfileBar";
import Search from "@components/search";
import {
    Box,
    styled,
    Avatar,
    Hidden,
    useTheme,
    MenuItem,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import WalletButton from "@containers/wallet-button";
import TickerHeader from "@layout/ticker-header";
import Canny from "@components/Canny";
import { toast } from "react-toastify";
import AnimatedCursor from "react-animated-cursor";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { setBalance, setLoading, setError } from "src/features/balanceSlice";
import { useBalanceMutation } from "src/services/launchpad.service";
import BalanceDropdown from "@components/BalanceDropdown";
import CartDropdown from "./CartDropdown";
import NotificationDropdown from "./NotificationDropdown";
import useSocketIO from "./useWebSocket";
import {
    addToCart,
    removeToCart,
    removeSingleIteams,
    emptycartIteam,
} from "src/features/cartSlice";
import NotificationBellIcon from "src/data/icons/BellIcon";
const MouseParticles = dynamic(() => import("react-mouse-particles"), {
    ssr: false,
});
import Image from "next/image";
import NotificationsIcon from '@mui/icons-material/Notifications';
const Header = ({ className }) => {
    const { carts } = useSelector((state) => state.cart);
    // const notifications = useSelector(
    //     (state) => state.notification.notifications
    // );
    // console.log(notifications, "notifications");
    const [showNotifications, setShowNotifications] = useState(false);
    console.log(carts);
    const sticky = useSticky();
    console.log(sticky, "sticky");
    const dispatch = useDispatch();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const [balanceMutation, { isLoading, isError, error }] =
        useBalanceMutation();
    const account = useAccountContext();
    console.log(account, "account");
    const { notifications, isConnected } = useSocketIO(account?.user?._id);

    console.log(notifications, "notifications");

    const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
    const router = useRouter();
    const { disconnect } = useWalletConnectClient();
    const balance = useSelector((state) => state.balance.value);
    console.log(balance, "balance");

    useEffect(() => {
        // dispatch(fetchNotifications());
    }, [dispatch]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const logout = async () => {
        const response = await userService.logout();
        console.log(response, "response");

        account.logoutWalletConnect();
        disconnect();
        setIsDropDownEnabled(false);
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (account?.walletAddressContect?.length > 0) {
                    dispatch(setLoading(true));
                    const response = await balanceMutation({
                        account: account?.walletAddressContect || "",
                    }).unwrap();
                    dispatch(setBalance(response));
                }
            } catch (error) {
                dispatch(setError(error.toString()));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchBalance();
    }, [account?.walletAddressContect, balanceMutation, dispatch]);

    const getUser = async () => {
        const response = await userService.getUserInit();
        console.log(response, "response");
        if (response?.data?.status === "success") {
            localStorage.setItem("token", response?.data?.token);
            await account.authWalletConnect(response?.data?.data.walletAddress);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    console.log(account, "account");

    return (
        <>
            {account?.user?._id && <Canny user={account?.user} />}
            <TickerHeader />
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuleftData} />
                                </nav>
                            </div>
                            <div
                                className="setting-option d-none d-lg-block"
                                style={{ marginLeft: "24px" }}
                            >
                                {/* <SearchForm /> */}
                                <Search />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>
                            {/* <div className="setting-option rn-icon-list">
                                <div className="icon-box">
                                    <a
                                        data-canny-link
                                        href="https://testkryptomerch.canny.io"
                                    >
                                        <i className="feather-message-circle" />
                                    </a>
                                </div>
                            </div> */}

                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <button onClick={toggleNotifications}>
                                        {/* <i className="feather-bell" /> */}
                                        <NotificationsIcon className="bell-icon-mat notification-icon" />
                                        

                                        {notifications.length > 0 && (
                                            <span className="badge">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>
                                </div>
                                {showNotifications && (
                                    <NotificationDropdown
                                        notifications={notifications}
                                        onViewAll={() =>
                                            router.push("/notifications")
                                        }
                                    />
                                )}
                            </div>

                            {/* //cart icon */}
                            <div className="setting-option rn-icon-list">
                                <div className="setting-option rn-icon-list">
                                    
                                    <CartDropdown />
                                </div>
                            </div>

                            <div className="setting-option rn-icon-list">
                                <div className="icon-box">
                                    <span
                                        className="current"
                                    >
                                        {/* {parseFloat(balance).toFixed(2)} KDA */}
                                        <BalanceDropdown balance={balance} />
                                    </span>
                                </div>
                            </div>

                            <div className="setting-option header-btn">
                                <div className="icon-box">
                                    {account?.walletAddressContect?.length >
                                    0 ? (
                                        <>
                                            <ProfileBar />
                                        </>
                                    ) : (
                                        <WalletButton />
                                    )}
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuleftData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
