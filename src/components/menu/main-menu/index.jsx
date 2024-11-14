import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import clsx from "clsx";
import SubMenu from "./submenu";
import MegaMenu from "./megamenu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MainMenu = ({ menu }) => (
    <ul className="mainmenu">
        {console.log(menu)}
        {menu.map((nav) => (
            <li
                key={nav.id}
                className={clsx(
                    !!nav.submenu && "has-menu-child-item",
                    !!nav.megamenu && "with-megamenu"
                )}
            >
                <Anchor className="its_new" path={nav.path}>
                    {nav.text}
                    {nav?.submenu && <KeyboardArrowDownIcon />}
                </Anchor>
                {nav?.submenu && <SubMenu menu={nav.submenu} />}
                {nav?.megamenu && <MegaMenu menu={nav.megamenu} />}
            </li>
        ))}
    </ul>
);

MainMenu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MainMenu;
