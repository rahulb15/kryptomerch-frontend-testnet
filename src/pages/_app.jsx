/* eslint-disable */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import { useHotkeys } from "react-hotkeys-hook";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import sal from "sal.js";
import { setSearchFocus } from "src/features/searchSlice"; // Make sure to import this
import { Providers } from "src/providers";
import { persistor, store } from "src/store/store";
import { INSTANCES, DEFAULT_INSTANCE } from "@utils/api/OnChainRefs";
import useSettings from "src/hooks/setting_hook";
console.log(INSTANCES);
console.log(DEFAULT_INSTANCE);
import "sweetalert2/src/sweetalert2.scss";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "../assets/css/swal.css";
import "../assets/scss/style.scss";
import "../components/search/styles.css";
import "../containers/wallet-button/styles.css";
import "../styles/sweetalert2-custom.css";
import { AudioPlayerProvider } from "src/contexts/AudioPlayerContext";
import { PersistentAudioPlayer } from "src/components/PersistentAudioPlayer";
import { UIProvider } from "src/contexts/UIContext";

const AppContent = ({ Component, pageProps }) => {
    const {
        data,
        isLoading,
        pactError,
        setInstance,
        validate,
        cleanImageCache,
    } = useSettings();

    useEffect(() => {
        const currentVersion = process.env.NEXT_PUBLIC_VERSION;
        const storedVersion = localStorage.getItem("appVersion");

        if (storedVersion !== currentVersion) {
            localStorage.setItem("appVersion", currentVersion);
            window.location.reload(true); // Force reload from server
        }
    }, []);

    useEffect(() => {
        console.log(DEFAULT_INSTANCE);
        if (DEFAULT_INSTANCE.name) {
            validate();
        }
    }, [DEFAULT_INSTANCE]);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);

    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });

    // Existing hotkeys
    useHotkeys("ctrl+shift+s", (event) => {
        console.log("Search Hotkey triggered");
        event.preventDefault();
        dispatch(setSearchFocus(true));
    });

    useHotkeys("esc", (event) => {
        console.log("Hotkey triggered");
        event.preventDefault();
        dispatch(setSearchFocus(false));
    });

    // New hotkeys
    useHotkeys("ctrl+shift+e", (event) => {
        console.log("Opening settings/preferences");
        event.preventDefault();
        router.push("/settings");
    });

    useHotkeys("ctrl+alt+n", (event) => {
        console.log("Opening notifications");
        event.preventDefault();
        router.push("/notifications");
    });

    useHotkeys("ctrl+shift+p", (event) => {
        console.log("Toggling theme");
        event.preventDefault();
        // Add your theme toggle logic here
    });

    useHotkeys("ctrl+shift+d", (event) => {
        console.log("Navigating to dashboard");
        event.preventDefault();
        router.push("/dashboard");
    });

    useHotkeys("ctrl+alt+m", (event) => {
        console.log("Opening messaging");
        event.preventDefault();
        router.push("/messages");
    });

    useHotkeys("ctrl+alt+o", (event) => {
        console.log("Opening orders");
        event.preventDefault();
        router.push("/orders");
    });

    useHotkeys("ctrl+shift+f", (event) => {
        console.log("Focus search");
        event.preventDefault();
        dispatch(setSearchFocus(true)); // Assuming this focuses your search bar
    });

    useHotkeys("alt+shift+h", (event) => {
        console.log("Opening help");
        event.preventDefault();
        router.push("/help");
    });

    useHotkeys("alt+shift+i", (event) => {
        console.log("Opening dev tools or inspection mode");
        event.preventDefault();
        // Add custom dev tools logic or route here
    });

    useHotkeys("ctrl+shift+u", (event) => {
        console.log("Opening user profile");
        event.preventDefault();
        router.push("/profile");
    });

    useHotkeys("ctrl+alt+s", (event) => {
        console.log("Saving data");
        event.preventDefault();
        // Add save data logic here
    });
    return (
        <ThemeProvider defaultTheme="dark">
            <ToastContainer />
            <Providers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Component {...pageProps} />
                </LocalizationProvider>
            </Providers>
        </ThemeProvider>
    );
};

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <UIProvider>
                <AudioPlayerProvider>
                    {/* <PersistentAudioPlayer /> */}
                    <AppContent Component={Component} pageProps={pageProps} />
                </AudioPlayerProvider>
            </UIProvider>
            </PersistGate>
        </Provider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
