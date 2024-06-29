"use client";
import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

interface props {
  result: SearchResult;
  fileType: string;
}

const InteractButtons: React.FC<props> = ({ result, fileType }) => {
  const [openShareSnackbar, setOpenShareSnackbar] = useState(false);
  const [openDownloadSnackbar, setOpenDownloadSnackbar] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  const handleDownload = async (result: SearchResult) => {
    const fileExtension = fileType.toLowerCase();
    const linkExtension = result.link.split(".").pop()?.toLowerCase();

    if (linkExtension === fileExtension) {
      try {
        const response = await fetch(result.link);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = result.title;
        link.click();
        window.URL.revokeObjectURL(url);
        setDownloadMessage("File downloaded successfully.");
      } catch (error) {
        console.error("Error downloading file:", error);
        setDownloadMessage("Download failed. An error occurred.");
      }
    } else {
      setDownloadMessage("Download failed. File type does not match.");
    }
    setOpenDownloadSnackbar(true);
  };

  const handleShare = async (result: SearchResult) => {
    try {
      await navigator.clipboard.writeText(result.link);
      setOpenShareSnackbar(true);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenShareSnackbar(false);
    setOpenDownloadSnackbar(false);
  };

  return (
    <>
      <IconButton
        aria-label="download"
        onClick={() => handleDownload(result)}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <DownloadIcon />
      </IconButton>
      <IconButton
        aria-label="share"
        onClick={() => handleShare(result)}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <ShareIcon />
      </IconButton>
      <Snackbar
        open={openShareSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Snackbar
        open={openDownloadSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={downloadMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default InteractButtons;
