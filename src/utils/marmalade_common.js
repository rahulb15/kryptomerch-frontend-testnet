// import Decimal from 'decimal.js';

// const PRICE_DIGITS = 3

// const NO_TIMEOUT = new Date("0000-01-01T00:00:00Z").getTime()

// const ZERO = Decimal("0")

// const auction_next_price = (sale) => sale ?  sale["current-price"].eq("0.0")
//                                              ?sale["start-price"]
//                                              :sale["current-price"].mul(sale["increment-ratio"]).toDecimalPlaces(PRICE_DIGITS, Decimal.ROUND_UP)
//                                           :null;

// const pretty_currency = (curr) =>  curr ? curr=="coin"?"KDA":curr
//                                         :"";

// const pretty_value = (val) =>  val?val.toFixed(PRICE_DIGITS):"...";

// const pretty_price = (val, currency) =>  `${pretty_value(val)} ${pretty_currency(currency)}`;

// const is_no_timeout =  x => x.getTime()==NO_TIMEOUT;

// const _compute_marketplace_fees = (val, {"min-fee":min, "max-fee":max, "fee-rate":rate}) => Decimal.min(Decimal.max(val.mul(rate), min), max);

// const compute_marketplace_fees = (val, fee) => fee?_compute_marketplace_fees(val, fee):ZERO;

// export {auction_next_price, pretty_price, pretty_currency, is_no_timeout, compute_marketplace_fees}



import Decimal from 'decimal.js';

const PRICE_DIGITS = 3;
const NO_TIMEOUT = new Date("0000-01-01T00:00:00Z").getTime();
const ZERO = new Decimal("0");

const auction_next_price = (sale) => sale 
    ? sale["current-price"].eq("0.0")
        ? sale["start-price"]
        : sale["current-price"].mul(sale["increment-ratio"]).toDecimalPlaces(PRICE_DIGITS, Decimal.ROUND_UP)
    : null;

const pretty_currency = (curr) => curr ? curr == "coin" ? "KDA" : curr : "";

const pretty_value = (val) => val ? val.toFixed(PRICE_DIGITS) : "...";

const pretty_price = (val, currency) => `${pretty_value(val)} ${pretty_currency(currency)}`;

const is_no_timeout = x => x.getTime() == NO_TIMEOUT;

const _compute_marketplace_fees = (val, { "min-fee": min, "max-fee": max, "fee-rate": rate }) => {
    if (!val || !Decimal.isDecimal(val)) {
        console.warn("Invalid value provided to _compute_marketplace_fees:", val);
        return ZERO;
    }
    return Decimal.min(Decimal.max(val.mul(rate), min), max);
};

const compute_marketplace_fees = (val, fee) => {
    if (!val || !fee) {
        console.warn("Invalid parameters provided to compute_marketplace_fees:", { val, fee });
        return ZERO;
    }
    return _compute_marketplace_fees(val, fee);
};

export { auction_next_price, pretty_price, pretty_currency, is_no_timeout, compute_marketplace_fees };