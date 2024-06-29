import { Typography, Box } from "@mui/material";

const Title: React.FC = () => (
  <Box sx={{ textAlign: "center", marginBottom: 4 }}>
    <Typography
      variant="h3"
      component="h1"
      sx={{
        fontWeight: "bold",
        background:
          "linear-gradient(45deg, #4285F4, #DB4437, #F4B400, #0F9D58)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        marginRight: 2,
      }}
    >
      Search
    </Typography>
    <Box
      component="img"
      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      alt="Google Logo"
      sx={{
        height: 52,
        verticalAlign: "bottom",
      }}
    />
    <Typography
      variant="h3"
      component="span"
      sx={{
        fontWeight: "bold",
        background:
          "linear-gradient(45deg, #4285F4, #DB4437, #F4B400, #0F9D58)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        marginLeft: 2,
      }}
    >
      by File Type
    </Typography>
  </Box>
);

export default Title;
