import {
    compute_marketplace_fees,
    pretty_price,
} from "@utils/marmalade_common";

const Price = ({ value, curr }) => <> {pretty_price(value, curr)} </>;

export { Price };
