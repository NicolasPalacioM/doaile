import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import logoLight from "@/public/logo-light.png";
import logoPrimary from "@/public/logo-primary.png";
import Link from "next/link";

interface props {
  type?: String;
}

const Logo: React.FC<props> = ({ type }) => {
  return (
    <Box
      sx={{
        width: { xs: 126, sm: 147 },
        height: { xs: 59, sm: 67 },
        position: "relative",
      }}
    >
      <Link href="/">
        {type === "primary" ? (
          <Image
            src={logoPrimary}
            fill
            alt="Family that manages The Wild Oasis"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src={logoLight}
            fill
            alt="Family that manages The Wild Oasis"
            style={{ objectFit: "contain" }}
          />
        )}
      </Link>
    </Box>
  );
};

export default Logo;
