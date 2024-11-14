import YAML from "yaml";
import { useState, useEffect, useCallback } from "react";
import {
    Icon,
    Card,
    Label,
    Message,
    Form,
    TextArea,
    Loader,
    Dimmer,
    Container,
    Button,
    Modal,
} from "semantic-ui-react";
import { CopyButton, TransactionLink } from "./Common";
import { m_client } from "@utils/api/chainweb_marmalade_ng";
import { pretty_currency } from "@utils/marmalade_common";
import { createEckoWalletQuicksign, signWithChainweaver } from "@kadena/client";
import ECKO_LOGO from "./assets/ecko-wallet-rounded.png";
import CHAINWEAVER_LOGO from "./assets/chainweaver-rounded.png";
import Image from "next/image";
import { Paper } from "@mui/material";
import nftServices from "src/services/nftServices";
import Swal from "sweetalert2";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import { createWalletConnectSign } from "@kadena/client";
import { useAccountContext } from "src/contexts";
const ecko_account = (networkId) =>
    window.kadena
        .request({ method: "kda_checkStatus", networkId })
        .then((x) => x.account.account);

const get_guard = (x) =>
    m_client.local_pact(`(coin.details "${x}")`).then((x) => x.guard);

const ecko = createEckoWalletQuicksign();

const cweaver = signWithChainweaver;

const SIGNERS = {
    Ecko: ecko,
    ChainWeaver_Desktop: cweaver,
    ChainWeaver: null,
    WalletConnect: null, // This will be dynamically set in the component
    "": null,
    null: null,
};

const SelectedLabel = () => (
    <Label color="green" icon="selected radio" corner="right" />
);

function SignatureModal({ trx, open, onClose }) {
    const sigdata =
        trx && open
            ? {
                  cmd: trx.cmd,
                  sigs: JSON.parse(trx.cmd).signers.map((x) => ({
                      pubKey: x.pubKey,
                      sig: null,
                  })),
              }
            : null;

    const yaml_data = YAML.stringify(sigdata);

    return (
        <Modal closeIcon open={open} onClose={onClose}>
            <Modal.Header>Copy Transaction to SigBuilder</Modal.Header>
            <Modal.Content>
                <Form>
                    <TextArea value={yaml_data} style={{ minHeight: 300 }} />
                </Form>
                <Container textAlign="center">
                    <CopyButton value={yaml_data} fontsize={24} />
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose} positive>
                    {" "}
                    Ok{" "}
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

function WalletAccountManager({ set_data, currency }) {
    const [wallet, setWallet] = useState("");
    const [account, _setAccount] = useState("");
    const [guard, setGuard] = useState("");
    console.log(wallet, account, guard);
    const [keyError, setKeyError] = useState(false);

    const _to_key = (g) => g?.keys?.[0] ?? "";

    useEffect(() => {
        if (wallet && account && guard)
            set_data({
                wallet: wallet,
                account: account,
                guard: guard,
                key: _to_key(guard),
            });
        else set_data(null);
    }, [wallet, account, guard]);

    const setAccount = (a) => {
        if (account != a) {
            setGuard(null);
            _setAccount(a);
            get_guard(a)
                .then((g) => {
                    setGuard(g);
                    setKeyError(false);
                })
                .catch(() => setKeyError(true));
        }
    };

    return (
        <>
            <Card.Group itemsPerRow={3}>
                {/* <EckoWalletCard onClick={() => setWallet("Ecko")} selected={wallet==="Ecko"} onAccount={setAccount}/> */}
                {/* <ChainWeaverCard onClick={() => setWallet("ChainWeaver")} selected={wallet==="ChainWeaver"} /> */}
                {/* <ChainWeaverDesktopCard onClick={() => setWallet("ChainWeaver_Desktop")} selected={wallet==="ChainWeaver_Desktop"}/> */}
            </Card.Group>

            <Form.Field>
                <label>Account:</label>
                <input
                    placeholder="Account"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    disabled={!wallet || wallet === "Ecko"}
                />
            </Form.Field>

            {keyError && (
                <Message
                    negative
                    header="Key Error"
                    list={[
                        "Can't retrieve key: Missing account or Unsupported guard",
                        `Make sure yout have a ${pretty_currency(
                            currency
                        )} account on Chain ${m_client.settings.chain} (${
                            m_client.settings.network
                        })`,
                    ]}
                />
            )}

            <Form.Field error={keyError}>
                <label>PubKey:</label>
                <input
                    placeholder="EDDSA key"
                    value={_to_key(guard)}
                    disabled
                />
            </Form.Field>
        </>
    );
}

function TransactionResult({ result, hash }) {
    const make_content = (x) => (
        <Message.Content>
            <Message.Header>On chain result</Message.Header>
            {x}
        </Message.Content>
    );

    if (!result)
        return (
            <Message icon>
                {" "}
                <Icon name="circle notched" loading />{" "}
                {make_content("Waiting for transaction confirmation")}{" "}
            </Message>
        );
    if (result.status == "success")
        return (
            <Message icon positive>
                {" "}
                <Icon name="thumbs up outline" />
                <Message.Content>
                    <Message.Header> On chain result </Message.Header>
                    <Message.List>
                        <Message.Item>
                            {" "}
                            Transaction Result: {JSON.stringify(result)}{" "}
                        </Message.Item>
                        <Message.Item>
                            {" "}
                            {/* <TransactionLink trx={hash} />{" "} */}
                        </Message.Item>
                    </Message.List>
                </Message.Content>
            </Message>
        );
    else
        return (
            <Message icon negative>
                {" "}
                <Icon name="thumbs down outline" />{" "}
                {make_content(JSON.stringify(result))}{" "}
            </Message>
        );
}

function TransactionManager({
    trx,
    wallet,
    onConfirm,
    data,
    onClose,
    type,
    amount,
}) {
    console.log(wallet, trx);
    console.log(type, data);
    const [localResult, setLocalResult] = useState(null);
    const [localError, setLocalError] = useState(false);
    const [sigSendError, setSigSendError] = useState(null);
    const [successful, setSuccessful] = useState(false);
    const [statusResult, setStatusResult] = useState(null);
    const [signatureModal, setSignatureModal] = useState(false);
    const [signer, setSigner] = useState(null);
    const accountuser = useAccountContext();
    console.log(accountuser);
    const { client: wcClient, session: wcSession } = useWalletConnectClient();
    console.log(wcClient, wcSession);

    useEffect(() => {
        try {
            const updateSigner = () => {
                if (wallet === "Other" && wcClient && wcSession) {
                    const signWithWalletConnect = createWalletConnectSign(
                        wcClient,
                        wcSession,
                        // "kadena:testnet04"
                        // process.env.NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID || "kadena:testnet04"
                        process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet"
                            ? process.env
                                  .NEXT_PUBLIC_MAINNET_WALLETCONNECT_CHAIN_ID
                            : process.env
                                  .NEXT_PUBLIC_TESTNET_WALLETCONNECT_CHAIN_ID
                    );
                    setSigner(() => signWithWalletConnect);
                } else {
                    setSigner(() => SIGNERS[wallet]);
                }
            };

            updateSigner();
        } catch (error) {
            console.log(error);
        }
    }, [wallet, wcClient, wcSession]);

    const do_sign = async () => {
        setSigSendError(null);
        setSuccessful(false);
        if (signer) {
            try {
                const signedTx = await signer(trx);
                const preflightedTx = await m_client.preflight(signedTx);
                await m_client.send(preflightedTx);
                setSuccessful(true);
                setStatusResult(null);
                const status = await m_client.status(trx);
                // Handle post-transaction logic (e.g., updating NFT status)
                await handlePostTransaction(
                    status,
                    type,
                    data,
                    amount,
                    accountuser.user
                );
                setStatusResult(status.result);
                if (onConfirm) onConfirm();
            } catch (error) {
                setSigSendError(error);
            }
        } else {
            setSignatureModal(true);
        }
    };
    useEffect(() => {
        setLocalResult(null);
        setLocalError(false);
        setSigSendError(null);
        setSuccessful(false);
        setStatusResult(null);
        if (trx) {
            m_client
                .local_check(trx, {
                    signatureVerification: false,
                    preflight: false,
                })
                .then((e) => {
                    setLocalResult(e);
                    setLocalError(false);
                })
                .catch((e) => {
                    setLocalResult(e);
                    setLocalError(true);
                });
        }
    }, [trx]);

    // const do_sign = async () => {
    //     setSigSendError(null);
    //     setSuccessful(false);
    //     if (signer) {
    //         signer(trx)
    //             .then((t) => m_client.preflight(t))
    //             .then((t) => m_client.send(t))
    //             .then(() => {
    //                 setSuccessful(true);
    //                 setStatusResult(null);
    //                 return m_client.status(trx).then(async (x) => {
    //                     const body = {
    //                         tokenId: data.tokenId,
    //                     };
    //                     if (type === "sell") {
    //                         const response = await nftServices.onSale(body);
    //                         if (response.status === "success") {
    //                             onClose();
    //                             Swal.fire({
    //                                 title: "Success",
    //                                 text: "NFT is on sale",
    //                                 icon: "success",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         } else {
    //                             Swal.fire({
    //                                 title: "Error",
    //                                 text: "NFT is not on sale",
    //                                 icon: "error",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         }
    //                     }
    //                     if (type === "close") {
    //                         onClose();
    //                         Swal.fire({
    //                             title: "Success",
    //                             text: "NFT is not on sale",
    //                             icon: "success",
    //                             confirmButtonText: "Ok",
    //                         });
    //                     }
    //                     if (type === "bid") {
    //                         const bidBody = {
    //                             nftId: data._id,
    //                             bidderAddress: data.owner,
    //                             bidAmount: parseFloat(amount),
    //                         };
    //                         const response = await nftServices.placeBid(bidBody);
    //                         console.log(response);
    //                         if (response.status === "success") {
    //                             onClose();
    //                             Swal.fire({
    //                                 title: "Success",
    //                                 text: "NFT is on bid",
    //                                 icon: "success",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         } else {
    //                             Swal.fire({
    //                                 title: "Error",
    //                                 text: "NFT is not on bid",
    //                                 icon: "error",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         }
    //                     }

    //                     if (type === "buy") {
    //                         const buyBody = {
    //                             nftId: data._id,
    //                             buyerWalletAddress: data.owner,
    //                         };
    //                         const response = await nftServices.buyNFT(buyBody);
    //                         console.log(response);
    //                         if (response.status === "success") {
    //                             onClose();
    //                             Swal.fire({
    //                                 title: "Success",
    //                                 text: "NFT is bought",
    //                                 icon: "success",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         } else {
    //                             Swal.fire({
    //                                 title: "Error",
    //                                 text: "NFT is not bought",
    //                                 icon: "error",
    //                                 confirmButtonText: "Ok",
    //                             });
    //                         }
    //                     }

    //                     setStatusResult(x.result);
    //                     if (onConfirm) onConfirm();
    //                 });
    //             })
    //             .catch((x) => setSigSendError(x));
    //     } else setSignatureModal(true);
    // };

    return (
        <Paper className="nft-transaction-manager">
            <div className="nft-transaction-field">
                <label>
                    Transaction:{" "}
                    {trx && <CopyButton value={trx.hash} fontsize={12} />}
                </label>
                <input
                className="nft-transaction-input"
                    placeholder="hash"
                    value={trx ? trx.hash : ""}
                    disabled
                />
            </div>
            {localResult && (
                <div
                    className={`nft-transaction-message ${
                        localError ? "negative" : "positive"
                    }`}
                >
                    <div className="nft-transaction-message-header">
                        Local Result:
                    </div>
                    <div>{localResult.toString()}</div>
                </div>
            )}

            <Button
                className="nft-transaction-button"
                disabled={!trx}
                onClick={do_sign}
            >
                Sign and Submit
            </Button>

            <SignatureModal
                trx={trx}
                open={signatureModal}
                onClose={() => setSignatureModal(false)}
            />
            {sigSendError && (
                <div className="nft-transaction-message negative">
                    <div className="nft-transaction-message-header">
                        Signature / Submit Error:
                    </div>
                    <div>{sigSendError.toString()}</div>
                </div>
            )}
            {successful && (
                <div className="nft-transaction-message positive">
                    <div className="nft-transaction-message-header">
                        Signature / Submit Result:
                    </div>
                    <div>Transaction successfully signed and submitted</div>
                </div>
            )}
            {successful && (
                <div className="nft-transaction-result">
                    <TransactionResult result={statusResult} hash={trx?.hash} />
                </div>
            )}
        </Paper>
    );
}

export { TransactionManager, WalletAccountManager };

// Helper function to handle post-transaction logic
async function handlePostTransaction(status, type, data, amount, user) {
    console.log("data", data);
    console.log("accountuser", user);
    const bidderAddress = user.walletAddress;
    switch (type) {
        case "sell":
            await handleSellNFT(data);
            break;
        case "close":
            await handleCloseNFTSale(data);
            break;
        case "bid":
            await handlePlaceBid(data, amount, bidderAddress);
            break;
        case "buy":
            await handleBuyNFT(data);
            break;
        default:
            console.log("Unknown transaction type");
    }
}

// Helper functions for each transaction type
async function handleSellNFT(data) {
    const response = await nftServices.onSale({ tokenId: data.tokenId });
    handleResponse(response, "NFT is on sale", "NFT is not on sale");
}

async function handleCloseNFTSale(data) {
    handleResponse(
        { status: "success" },
        "NFT is not on sale",
        "Failed to close NFT sale"
    );
}

async function handlePlaceBid(data, amount, bidderAddress) {
    const bidBody = {
        nftId: data._id,
        bidderAddress: bidderAddress,
        bidAmount: parseFloat(amount),
    };
    const response = await nftServices.placeBid(bidBody);
    handleResponse(response, "NFT is on bid", "NFT is not on bid");
}

async function handleBuyNFT(data) {
    const buyBody = {
        nftId: data._id,
        buyerWalletAddress: data.owner,
    };
    const response = await nftServices.buyNFT(buyBody);
    handleResponse(response, "NFT is bought", "NFT is not bought");
}

// Helper function to handle responses and show alerts
function handleResponse(response, successMessage, errorMessage) {
    if (response.status === "success") {
        Swal.fire({
            title: "Success",
            text: successMessage,
            icon: "success",
            confirmButtonText: "Ok",
        });
    } else {
        Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}
