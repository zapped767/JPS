import React from "react";
import {motion} from "framer-motion";

export const PageLoader: React.FC = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200"
        >
            <motion.div
                className="h-full bg-gradient-to-r from-[#872BFF] to-purple-600"
                initial={{width: "0%"}}
                animate={{width: "100%"}}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
};