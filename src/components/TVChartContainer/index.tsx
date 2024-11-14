import { Avatar, Box, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
    FaChevronRight,
    FaChevronLeft,
    FaChartLine,
    FaExchangeAlt,
    FaHistory,
    FaCog,
} from "react-icons/fa";
import TradingViewChart from "./TradingViewChart";

const Layout = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`;

const Sidebar = styled(motion.div)`
    background-color: #1a1a1a;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
    min-width: 60px;
    overflow: hidden; /* Prevent scrolling */
`;

const SidebarToggle = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
    background-color: #333;
    border-radius: 50%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    min-width: 60px; /* Ensure icons are visible */

    &:hover {
        background-color: #333;
    }

    svg {
        margin-right: 10px;
    }
`;

const SidebarAvatarWrapper = styled.div<{ isSidebarOpen: boolean }>`
    cursor: pointer;
    width: ${props => (props.isSidebarOpen ? '42px' : '30px')};
    height: ${props => (props.isSidebarOpen ? '42px' : '30px')};
    transition: width 0.3s, height 0.3s;
`;

const SidebarText = styled.h1<{ isSidebarOpen: boolean }>`
    display: ${props => (props.isSidebarOpen ? 'block' : 'none')};
    margin-left: 10px;
    transition: display 0.3s;
`;

const ChartContainer = styled.div`
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: transparent;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const sampleData = [
    { time: "2024-08-01", open: 100, high: 105, low: 98, close: 103 },
    { time: "2024-08-02", open: 103, high: 107, low: 101, close: 105 },
    { time: "2024-08-03", open: 105, high: 110, low: 102, close: 108 },
    { time: "2024-08-04", open: 108, high: 115, low: 105, close: 112 },
    { time: "2024-08-05", open: 112, high: 120, low: 110, close: 115 },
    { time: "2024-08-06", open: 115, high: 125, low: 112, close: 123 },
    { time: "2024-08-07", open: 123, high: 130, low: 120, close: 127 },
    { time: "2024-08-08", open: 127, high: 135, low: 125, close: 130 },
    { time: "2024-08-09", open: 130, high: 140, low: 128, close: 135 },
    { time: "2024-08-10", open: 135, high: 145, low: 130, close: 140 },
    { time: "2024-08-11", open: 140, high: 150, low: 135, close: 145 },
    { time: "2024-08-12", open: 145, high: 155, low: 140, close: 150 },
    { time: "2024-08-13", open: 150, high: 160, low: 145, close: 155 },
];

export const TVChartContainer = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const sidebarVariants = {
        open: { width: "250px" },
        closed: { width: "60px" },
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    function generateRandomStockData(startDate, numDays) {
        const data = [];
        let currentPrice = Math.random() * 100 + 50; // Random starting price between 50 and 150

        for (let i = 0; i < numDays; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);

            const dailyChange = (Math.random() - 0.5) * 10; // Random change between -5 and 5
            const open = currentPrice;
            const close = open + dailyChange;
            const high = Math.max(open, close) + Math.random() * 5;
            const low = Math.min(open, close) - Math.random() * 5;

            data.push({
                time: date.toISOString().split("T")[0],
                open: Number(open.toFixed(2)),
                high: Number(high.toFixed(2)),
                low: Number(low.toFixed(2)),
                close: Number(close.toFixed(2)),
            });

            currentPrice = close;
        }

        return data;
    }

    // Generate 30 days of random stock data starting from August 1, 2024
    const randomizedData = generateRandomStockData("2024-06-01", 30);
    console.log(randomizedData);

    return (
        <Layout>
            <Sidebar
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3 }}
            >
                <SidebarToggle onClick={toggleSidebar}>
                    {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </SidebarToggle>
                {/* <SidebarItem>
                    <SidebarAvatarWrapper isSidebarOpen={isSidebarOpen}>
                        <Avatar
                            src={"/assets-images/client-logo3.png"}
                            alt="user photo"
                            variant="rounded"
                        />
                    </SidebarAvatarWrapper>
                    <SidebarText isSidebarOpen={isSidebarOpen}>Collection Name</SidebarText>
                </SidebarItem> */}
                 <SidebarItem>
                    <FaChartLine />
                    {isSidebarOpen && <span>Charts</span>}
                </SidebarItem>
                <SidebarItem>
                    <FaExchangeAlt />
                    {isSidebarOpen && <span>Trade</span>}
                </SidebarItem>
                <SidebarItem>
                    <FaHistory />
                    {isSidebarOpen && <span>History</span>}
                </SidebarItem>
                <SidebarItem>
                    <FaCog />
                    {isSidebarOpen && <span>Settings</span>}
                </SidebarItem>
            </Sidebar>
            <ChartContainer>
                <TradingViewChart data={randomizedData} />
            </ChartContainer>
        </Layout>
    );
};