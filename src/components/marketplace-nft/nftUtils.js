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

function useFee(token_id) {
    const { policies } = useTokenPolicies(token_id);
    return policies && policies.includes("MARKETPLACE")
        ? fees[m_client.network]
        : undefined;
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

export {
    useFee,
    get_guard,
    make_trx,
    auction_next_price,
    clear_sales,
    make_bid_trx,
};
