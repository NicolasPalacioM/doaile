import Navbar from "@/app/_components/Navbar";
import Results from "@/app/_components/Results";
import Searchbar from "@/app/_components/Searchbar";
import TagSnippet from "@/app/_components/Tag-snippet";
import { getQueries, getResults } from "@/app/_lib/data-service";
import { Box, Container } from "@mui/material";
import { NextPage } from "next";

interface ResultsProps {
  params: {
    resultId: string;
  };
}

const ResultsPage: NextPage<ResultsProps> = async ({ params }) => {
  const { resultId } = params;
  const queries = await getQueries(resultId);

  if (!queries) return null;

  const { query: searchQuery, file_type: fileType } = queries;
  const { searchResults, totalResults, nextPageStartIndex } = await getResults(
    searchQuery,
    fileType
  );

  const formattedTotal = totalResults.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <>
      <Navbar bgColor="transparent">
        <Searchbar />
      </Navbar>
      <Container maxWidth="md">
        <Box my={4}>
          <TagSnippet>About {formattedTotal} results</TagSnippet>
          <Results
            initialResults={searchResults}
            searchQuery={searchQuery}
            fileType={fileType}
            nextPageStartIndex={nextPageStartIndex}
          />
        </Box>
      </Container>
    </>
  );
};

export default ResultsPage;
