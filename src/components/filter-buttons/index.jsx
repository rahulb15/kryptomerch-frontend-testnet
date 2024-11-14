import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const FilterButtons = ({ buttons, filterHandler }) => {
    const [active, setActive] = useState("All");
    const activeHandler = (filterKey) => {
        setActive(filterKey);
        filterHandler(filterKey);
    };
    return (
        <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end mt_md--30 mt_sm--30">
            {buttons.map((button) => (
                <button
                    key={button}
                    type="button"
                    className={clsx(button === active && "is-checked")}
                    onClick={() => activeHandler(button)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

FilterButtons.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
    filterHandler: PropTypes.func.isRequired,
};

export default FilterButtons;