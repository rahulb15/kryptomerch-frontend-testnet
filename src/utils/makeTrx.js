import { Pact } from "@kadena/client";
import { m_client } from "@utils/api/chainweb_marmalade_ng";
const timep = (x) => (x ? { timep: x.toISOString() } : null);
const dec = (x) => ({ decimal: x.toString() });

export function make_nonce() {
    const a = new Uint8Array(8);
    crypto.getRandomValues(a);
    return "ng_expl:" + Array.from(a, (x) => x.toString(16)).join("");
}

const coin_fungible = {
    refSpec: [{ namespace: null, name: "fungible-v2" }],
    refName: { namespace: null, name: "coin" },
};

const make_trx_fixed = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { tout, price }
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
console.log(MAKE_TRX);

export { MAKE_TRX };