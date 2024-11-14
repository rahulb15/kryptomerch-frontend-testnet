/* eslint-disable */

import { MotionConfig, motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { transition } from "./setting";

export default function WalletButton() {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <MotionConfig transition={transition}>
            <motion.button
                ref={ref}
                className="button-wal"
                initial={false}
                animate={isHover ? "hover" : "rest"}
                whileTap="press"
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.0 },
                    press: { scale: 0.9 },
                }}
                onHoverStart={() => {
                    resetMousePosition();
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    resetMousePosition();
                    setIsHover(false);
                }}
                onTapStart={() => setIsPress(true)}
                onTap={() => setIsPress(false)}
                onTapCancel={() => setIsPress(false)}
                onPointerMove={(e) => {
                    mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                    mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                }}
            >
                <motion.div
                    className="shapes"
                    variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                    }}
                >
                    <div className="pink blush" />
                    <div className="blue blush" />
                </motion.div>
                <motion.div
                    variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
                    className="label"
                >
                    <Link
                        href="/connect"
                        passHref
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <span style={{ color: "rgb(216 216 216)" }}>
                            Connect
                        </span>
                    </Link>
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
}
