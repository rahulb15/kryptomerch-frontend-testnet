import {
    useTokenPolicies,
    useSalesForToken,
    useTokenBalance,
    useTokenSupply,
    usePrecision,
    useRoyalty,
    clear_sales,
} from "src/hooks/SWR_Hooks";
import { m_client } from "@utils/api/chainweb_marmalade_ng";
import fees from "@utils/fees.json";
import { Pact } from "@kadena/client";
import Decimal from "decimal.js";

const PRICE_DIGITS = 2;
const timep = (x) => (x ? { timep: x.toISOString() } : null);

function useFee(token_id) {
    const { policies } = useTokenPolicies(token_id);
    return policies && policies.includes("MARKETPLACE")
        ? fees[m_client.network]
        : undefined;
}


const coin_fungible = {
    refSpec: [{ namespace: null, name: "fungible-v2" }],
    refName: { namespace: null, name: "coin" },
};

const has_fixed = (p) => p.includes("FIXED-SALE");
const has_auction = (p) => p.includes("AUCTION-SALE");
const has_dutch_auction = (p) => p.includes("DUTCH-AUCTION-SALE");

function default_sale(policies) {
    if (has_fixed(policies)) return "FIXED-SALE";
    if (has_auction(policies)) return "AUCTION-SALE";
    if (has_dutch_auction(policies)) return "DUTCH-AUCTION-SALE";
    return "UNDEF";
}

const get_guard = (x) =>
    m_client?.local_pact(`(coin.details "${x}")`).then((x) => x.guard);

const dec = (x) => ({ decimal: x.toString() });

export function make_nonce() {
    const a = new Uint8Array(8);
    crypto.getRandomValues(a);
    return "ng_expl:" + Array.from(a, (x) => x.toString(16)).join("");
}

const make_trx = (sale, buyer, buyer_guard) =>
    Pact.builder
        .continuation({ pactId: sale["sale-id"], step: 1, rollback: false })
        .setMeta({ sender: buyer, chainId: m_client.chain, gasLimit: 10000 })
        .setNetworkId(m_client.network)
        .addData("buyer", buyer)
        .addData("buyer-guard", buyer_guard)
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability(
                "coin.TRANSFER",
                buyer,
                sale["escrow-account"],
                dec(sale.price)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const auction_next_price = (sale) =>
    sale
        ? sale["current-price"].eq("0.0")
            ? sale["start-price"]
            : sale["current-price"]
                  .mul(sale["increment-ratio"])
                  .toDecimalPlaces(PRICE_DIGITS, Decimal.ROUND_UP)
        : null;

const make_bid_trx = (sale, buyer, buyer_guard, price) =>
    Pact.builder
        .execution(
            `(${m_client.policy_auction_sale}.place-bid "${
                sale["sale-id"]
            }" "${buyer}" (read-msg "bg") ${price.toFixed(12)})`
        )
        .setMeta({ sender: buyer, chainId: m_client.chain, gasLimit: 10000 })
        .setNetworkId(m_client.network)
        .addData("bg", buyer_guard)
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability(
                "coin.TRANSFER",
                buyer,
                sale["escrow-account"],
                dec(price)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_trx_fixed = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { tout, price }
) =>{
    console.log("amount", amount);
    return Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(6)} ${
                tout ? "(read-msg 'tout)" : `${m_client.ledger}.NO-TIMEOUT`
            })`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "fixed",
            currency: coin_fungible,
        })
        .addData(`marmalade_fixed_quote_${token_id}`, {
            price: dec(price),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();
    };

const make_trx_dutch = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { start_price, end_price, end_date, tout }
) =>
    Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(6)} ${
                tout ? "(read-msg 'tout)" : `${m_client.ledger}.NO-TIMEOUT`
            })`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "dutch_auction",
            currency: coin_fungible,
        })
        .addData(`marmalade_dutch_quote_${token_id}`, {
            start_price: dec(start_price),
            end_price: dec(end_price),
            end_time: timep(end_date),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_trx_auction = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { start_price, increment, tout }
) =>
    Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(
                6
            )} (read-msg 'tout))`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "auction",
            currency: coin_fungible,
        })
        .addData(`marmalade_auction_${token_id}`, {
            start_price: dec(start_price),
            increment_ratio: dec(increment),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const MAKE_TRX = {
    "FIXED-SALE": make_trx_fixed,
    "DUTCH-AUCTION-SALE": make_trx_dutch,
    "AUCTION-SALE": make_trx_auction,
};

export {
    useFee,
    get_guard,
    make_trx,
    auction_next_price,
    clear_sales,
    make_bid_trx,
    make_trx_fixed,
    make_trx_dutch,
    make_trx_auction,
    default_sale,
    has_fixed,
    has_auction,
    has_dutch_auction,
    MAKE_TRX,
};
