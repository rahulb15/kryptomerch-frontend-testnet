import Logo from "@components/collection-detail-logo";
import SideMenu from "@components/menu/side-menu";
import HelpMenu from "@components/menu/help-menu";
import AuthorProfile from "@components/author-profile";

// Demo Data

import headerData from "../../../data/general/header-02.json";
import sideMenuData from "../../../data/general/menu-02.json";
import helpMenuData from "../../../data/general/menu-03.json";

const Header = ({ collection }) => {
    console.log("collection", collection);

    return (
        <div className="d-none d-lg-block">
            <div className="header-area left-header-style d-flex">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Logo
                        logoUrl={collection?.data?.data?.collectionCoverImage}
                        size={80}
                        className="my-4"
                    />
                </div>
                <div className="sidebar-nav-wrapper">
                    <SideMenu menu={sideMenuData} />
                    <HelpMenu menu={helpMenuData} />
                </div>
                <div style={{ marginBottom: "220px" }}>
                    {headerData?.author && (
                        <AuthorProfile
                            name={headerData.author.name}
                            image={headerData.author.image}
                            balance={headerData.author.balance}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
