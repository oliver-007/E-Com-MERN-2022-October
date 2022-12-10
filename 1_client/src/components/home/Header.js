import React from "react";
import { motion } from "framer-motion";

const Header = ({ children }) => {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="header-cover">
        <div className="my-container flex-y h-[300px] ">
          <h1 className="header-heading"> {children} </h1>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
