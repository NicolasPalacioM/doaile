"use server";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDB({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY as string,
  },
});

interface SearchQuery {
  query: string;
  file_type: string;
}

export async function getQueries(
  searchHash: string
): Promise<SearchQuery | null> {
  const params = {
    TableName: "search_results",
    Key: {
      result_hash: { S: searchHash },
    },
  };

  try {
    const { Item } = await dynamodb.getItem(params);

    if (Item) {
      const query = Item.query.S;
      const file_type = Item.file_type.S;

      if (query && file_type) {
        return { query, file_type };
      }
    }

    return null;
  } catch (error) {
    console.error("Error retrieving search result:", error);
    throw error;
  }
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface SearchResponse {
  searchResults: SearchResult[];
  totalResults: string;
  nextPageStartIndex: number | null;
}

export async function getResults(
  query: string,
  fileType: string,
  startIndex: number | null = 1
): Promise<SearchResponse> {
  const apiKey = "AIzaSyCHDyEMef7010uLqkduxPqWqn6nFIbwWIE";
  const searchEngineId = "156d54fbb62b2447c";
  const url = `https://www.googleapis.com/customsearch/v1?key=${
    process.env.SEARCH_API_KEY
  }&cx=${process.env.SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}${
    fileType !== "all" ? `&fileType=${fileType}` : ""
  }&start=${startIndex}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(startIndex);

    if (data.items && data.items.length > 0) {
      const searchResults: SearchResult[] = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      }));

      const totalResults = data.queries.request[0].totalResults;

      let nextPageStartIndex: number | null = null;
      if (data.queries.nextPage && data.queries.nextPage.length > 0) {
        nextPageStartIndex = data.queries.nextPage[0].startIndex;
      }

      return {
        searchResults,
        totalResults,
        nextPageStartIndex,
      };
    } else {
      return {
        searchResults: [],
        totalResults: "0",
        nextPageStartIndex: null,
      };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      searchResults: [],
      totalResults: "0",
      nextPageStartIndex: null,
    };
  }
}
