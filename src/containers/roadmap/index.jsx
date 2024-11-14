import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    Table,
    Select,
    Avatar,
    styled,
    TableRow,
    useTheme,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    Grid,
    Modal,
    TextField,
    Checkbox,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Pagination,
    Divider,
    Skeleton,
    Stack,
    Tabs,
    Tab,
    AppBar,
    Accordion,
    AccordionSummary,

  } from "@mui/material";
  import Swal from "sweetalert2";
  import clsx from "clsx";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const RoadmapArea = ({ className, space }) => {
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        switch (value) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div
        className={clsx(
            "rn-breadcrumb-inner",
            className,
            space === 1 && "ptb--30"
        )}
    >
        <div className="container">
            <div className="row align-items-center">
                {/* <div className="col-lg-6 col-md-6 col-12"> */}
                <Box sx={{ width: "100%" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                            "& .MuiTab-root": {
                                color: "#888",
                                fontSize: "small",
                                "&.Mui-selected": {
                                    color: "#a9b729c9",
                                    fontSize: "large",
                                },
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#a9b729c9",
                            },
                        }}
                    >
                        <Tab label="All" {...a11yProps(0)} />
                        <Tab
                            label="Blockchain"
                            {...a11yProps(1)}
                        />
                        <Tab label="Creator" {...a11yProps(2)} />
                        <Tab label="Kryptomerch" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                {/* </div> */}
            </div>
        </div>
    </div>
    );
};

export default RoadmapArea;
