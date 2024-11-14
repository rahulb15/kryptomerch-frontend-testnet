import React, { useState, useCallback, useMemo } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TablePagination,
    Checkbox,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSyncWithNgMutation } from "src/services/marketplace.service";
import { useAccountContext } from "src/contexts";
import nftServices from "src/services/nftServices";

const UnrevealedTokensModal = ({ open, handleClose, data }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedIds, setSelectedIds] = useState([]);
    const [syncWithNg] = useSyncWithNgMutation();
    const account = useAccountContext();
    const { user } = account;

    const StyledTableContainer = styled(TableContainer)({
        marginBottom: theme.spacing(2),
        borderRadius: "8px",
        boxShadow: theme.shadows[2],
        overflowY: "auto",
        maxHeight: "50vh",
    });

    const StyledButton = styled(Button)({
        padding: theme.spacing(1.5, 3),
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "8px",
    });

    const StyledTableHead = styled(TableHead)({
        "& .MuiTableCell-head": {
            fontSize: "1.1rem",
            fontWeight: "bold",
        },
    });

    const StyledTableBody = styled(TableBody)({
        "& .MuiTableCell-body": {
            fontSize: "1rem",
        },
    });

    const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2),
        "& .MuiTablePagination-actions": {
            display: "flex",
            alignItems: "center",
            marginLeft: theme.spacing(2),
        },
        "& .MuiIconButton-root": {
            padding: theme.spacing(1),
        },
    }));

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const toggleSelection = useCallback((id) => {
        setSelectedIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((selectedId) => selectedId !== id)
                : [...prevIds, id]
        );
    }, []);

    const handleSyncWithNg = useCallback(async () => {
        try {
            const response = await syncWithNg({
                syncColName: data[0]["collection-name"],
                syncTkns: selectedIds.sort((a, b) => a - b).join(" "),
                walletName: user?.walletName,
            });
            console.log("response", response);
            //    const response = {
            //         data: {
            //           gas: 5075,
            //           result: {
            //             status: 'success',
            //             data: [ 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc' ]
            //           },
            //           reqKey: 'jO_Y04Agp8p9hujnQ4mJhaZ5dlnFPQl0ecDdmdK_4u4',
            //           logs: 'frlHt2oBy2pTMRYT4otthUwgg2cT4WbsmVNc6AF21NU',
            //           events: Array(6) [
            //             {
            //               params: [
            //                 'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe', 'k:db776793be0fcf8e76c75bdb35a36e67f298111dc6145c66693b0133192e2616',
            //                 0.00005075
            //               ],
            //               name: 'TRANSFER',
            //               module: { namespace: null, name: 'coin' },
            //               moduleHash: 'klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s'
            //             },
            //             {
            //               params: [
            //                 'c_marketMonkey2_Zmve-UZrTp2SzSIOQSULHtRFNV-NWPE9vsBKlyLZCMQ', 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc'
            //               ],
            //               name: 'ADD-TO-COLLECTION',
            //               module: {
            //                 namespace: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
            //                 name: 'policy-collection'
            //               },
            //               moduleHash: 'OOsTKpL4F85MH-rq_kFvn3bZ4id-pJMP5ZSUrZTF46E'
            //             },
            //             {
            //               params: [
            //                 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc',
            //                   'https://arkade-prod.s3.amazonaws.com/looney-bulls-airdrop-NG-metadata/46.json',
            //                 { int: 0 },
            //                 [
            //                   'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-collection', 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-instant-mint',
            //                   'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-marketplace', 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-fixed-sale',
            //                   'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-auction-sale'
            //                 ]
            //               ],
            //               name: 'TOKEN-CREATE',
            //               module: {
            //                 namespace: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
            //                 name: 'ledger'
            //               },
            //               moduleHash: 'u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU'
            //             },
            //             {
            //               params: [
            //                 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc', 'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
            //                 1
            //               ],
            //               name: 'MINT',
            //               module: {
            //                 namespace: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
            //                 name: 'ledger'
            //               },
            //               moduleHash: 'u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU'
            //             },
            //             {
            //               params: [ 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc', 1 ],
            //               name: 'SUPPLY',
            //               module: {
            //                 namespace: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
            //                 name: 'ledger'
            //               },
            //               moduleHash: 'u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU'
            //             },
            //             {
            //               params: [
            //                 't:BGTGJ3gFPDzOCEVGrhs48RCQEaZN4EVS6UXVJZO1Xfc', 1, { account: '', current: 0, previous: 0 },
            //                 {
            //                   account:
            //                     'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
            //                   current: 1,
            //                   previous: 0
            //                 }
            //               ],
            //               name: 'RECONCILE',
            //               module: {
            //                 namespace: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
            //                 name: 'ledger'
            //               },
            //               moduleHash: 'u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU'
            //             }
            //           ],
            //           metaData: {
            //             blockTime: 1725304298685067,
            //             prevBlockHash: 'Z5heAIb7SgjpsoGCCcNYg8qpGmGN219MTfY26_JJJ1U',
            //             blockHash: 'E0wgOVy0WeUa90JhubN9dEwKYFAHdOIjOOqc4uvPLlk',
            //             blockHeight: 4610476
            //           },
            //           continuation: null,
            //           txId: 6429254
            //         }
            //       }
            console.log("response", response);
            if (response.data.result.status === "success") {
                // createNFT
                const databody = {
                    collectionName: data[0]["collection-name"],
                    tokenId: response.data.result.data,
                    wallet: user?.walletAddress,
                };
                console.log("databody", databody);
                const result = await nftServices.updateMyNFT(databody);
                console.log("result", result);
                if (result) {
                    handleClose();
                } else {
                    console.log("Error in creating NFT");
                }
                // handleClose();
            } else {
                console.log("Error in syncing with NG");
            }
        } catch (error) {
            console.error("Error syncing:", error);
        }
    }, [syncWithNg, data, selectedIds, user]);

    const visibleRows = useMemo(
        () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [data, page, rowsPerPage]
    );

    const handleSelectAll = useCallback(() => {
        setSelectedIds(
            selectedIds.length === data.length
                ? []
                : data.map((row) => row.accountId.int)
        );
    }, [data, selectedIds]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            fullScreen={fullScreen}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "8px",
                },
            }}
        >
            <DialogTitle
                style={{
                    backgroundColor: "#b2b500",
                    color: theme.palette.primary.contrastText,
                    textAlign: "center",
                    padding: theme.spacing(2),
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                }}
            >
                Unrevealed Tokens
            </DialogTitle>
            <DialogContent style={{ padding: theme.spacing(4) }}>
                <StyledTableContainer component={Paper}>
                    <Table stickyHeader>
                        <StyledTableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selectedIds.length > 0 &&
                                            selectedIds.length < data.length
                                        }
                                        checked={
                                            selectedIds.length === data.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Collection Name</TableCell>
                                <TableCell>Account</TableCell>
                                <TableCell>Account ID</TableCell>
                                <TableCell>Revealed</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <StyledTableBody>
                            {visibleRows.map((row) => (
                                <TableRow key={row.accountId.int} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedIds.includes(
                                                row.accountId.int
                                            )}
                                            onChange={() =>
                                                toggleSelection(
                                                    row.accountId.int
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {row["collection-name"]}
                                    </TableCell>
                                    <TableCell>{row.account}</TableCell>
                                    <TableCell>{row.accountId.int}</TableCell>
                                    <TableCell>
                                        {row.revealed ? "Yes" : "No"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </StyledTableBody>
                    </Table>
                </StyledTableContainer>
                <StyledTablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                        gap: theme.spacing(2),
                    }}
                >
                    <StyledButton
                        onClick={handleClose}
                        variant="outlined"
                        sx={{ color: "#b2b500", borderColor: "#b2b500" }}
                    >
                        Close
                    </StyledButton>
                    <StyledButton
                        onClick={handleSyncWithNg}
                        variant="contained"
                        sx={{ backgroundColor: "#b2b500" }}
                        disabled={selectedIds.length === 0}
                    >
                        Bulk Sync ({selectedIds.length})
                    </StyledButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export { UnrevealedTokensModal };
