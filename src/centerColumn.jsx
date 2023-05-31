import React from "react";
import Box from "@mui/material/Box";

const CenterColumn = ({children}) => {
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box maxWidth="600px" width="100%" padding="16px">
          {children}
        </Box>
      </Box>
    )
}

export default CenterColumn;