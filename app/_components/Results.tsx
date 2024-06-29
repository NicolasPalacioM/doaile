"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import InteractButtons from "./InteractButtons";
import { SearchResult } from "../_lib/data-service";
import { getResults } from "../_lib/data-service";

interface ResultsProps {
  initialResults: SearchResult[];
  searchQuery: string;
  fileType: string;
  nextPageStartIndex: number | null;
}

const Results: React.FC<ResultsProps> = ({
  initialResults,
  searchQuery,
  fileType,
  nextPageStartIndex,
}) => {
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(nextPageStartIndex !== null);
  const [currentPageStartIndex, setCurrentPageStartIndex] =
    useState(nextPageStartIndex);

  const fetchMoreResults = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    const { searchResults, nextPageStartIndex: newNextPageStartIndex } =
      await getResults(searchQuery, fileType, currentPageStartIndex);
    setResults((prevResults) => [...prevResults, ...searchResults]);
    setCurrentPageStartIndex(newNextPageStartIndex);
    setHasMore(newNextPageStartIndex !== null);
    setLoading(false);
  }, [hasMore, searchQuery, fileType, currentPageStartIndex]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      fetchMoreResults();
    }
  }, [fetchMoreResults, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Grid container spacing={2}>
        {results.map((result, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="h2">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  </Typography>
                  <Box>
                    <InteractButtons result={result} fileType={fileType} />
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {result.snippet}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {loading && (
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <CircularProgress />
            </Box>
          </Grid>
        )}
        {!hasMore && (
          <Typography variant="body2" align="center" my={2}>
            No more results
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Results;
