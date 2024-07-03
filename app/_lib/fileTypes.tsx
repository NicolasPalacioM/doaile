import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import GridOnIcon from "@mui/icons-material/GridOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import ExploreIcon from "@mui/icons-material/Explore";
import CodeIcon from "@mui/icons-material/Code";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ImageIcon from "@mui/icons-material/Image";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import VideocamIcon from "@mui/icons-material/Videocam";

export const fileTypeOptions = [
  { value: "all", label: "All", icon: <FilterAltIcon /> },
  { value: "pdf", label: "PDF", icon: <PictureAsPdfIcon /> },
  { value: "ps", label: "PS", icon: <DescriptionIcon /> },
  { value: "csv", label: "CSV", icon: <GridOnIcon /> },
  { value: "epub", label: "EPUB", icon: <MenuBookIcon /> },
  { value: "kml_kmz", label: "KML/KMZ", icon: <PublicIcon /> },
  { value: "gpx", label: "GPX", icon: <ExploreIcon /> },
  { value: "hwp", label: "HWP", icon: <DescriptionIcon /> },
  { value: "html", label: "HTML", icon: <CodeIcon /> },
  { value: "xls_xlsx", label: "XLS/XLSX", icon: <GridOnIcon /> },
  { value: "ppt_pptx", label: "PPT/PPTX", icon: <SlideshowIcon /> },
  { value: "doc_docx", label: "DOC/DOCX", icon: <DescriptionIcon /> },
  { value: "odp", label: "ODP", icon: <SlideshowIcon /> },
  { value: "ods", label: "ODS", icon: <GridOnIcon /> },
  { value: "odt", label: "ODT", icon: <DescriptionIcon /> },
  { value: "rtf", label: "RTF", icon: <DescriptionIcon /> },
  { value: "svg", label: "SVG", icon: <ImageIcon /> },
  { value: "tex", label: "TEX", icon: <DescriptionIcon /> },
  { value: "txt", label: "TXT", icon: <TextSnippetIcon /> },
  { value: "source_code", label: "Source Code", icon: <CodeIcon /> },
  { value: "wml_wap", label: "WML/WAP", icon: <PhoneAndroidIcon /> },
  { value: "xml", label: "XML", icon: <CodeIcon /> },
  { value: "image", label: "Image", icon: <ImageIcon /> },
  { value: "video", label: "Video", icon: <VideocamIcon /> },
];
