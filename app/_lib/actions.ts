"use server";

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { createHash } from "crypto";
import { redirect } from "next/navigation";

const dynamodb = new DynamoDB({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY as string,
  },
});

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export async function storeResults(formData: FormData): Promise<void> {
  const query = formData.get("search") as string;
  let fileType = formData.get("file_type") as string;
  if (fileType === "") fileType = "all";
  const normalizedQuery = normalizeQuery(query);
  const timestamp = Date.now();
  const truncatedHash = createHash("sha256")
    .update(normalizedQuery + fileType)
    .digest("hex")
    .slice(0, 16);

  const params = {
    TableName: "search_results",
    Item: {
      result_hash: { S: truncatedHash },
      timestamp: { N: timestamp.toString() },
      query: { S: normalizedQuery },
      file_type: { S: fileType },
    },
  };

  try {
    await dynamodb.putItem(params);
    console.log("Search result stored successfully");
    redirect(`/results/${truncatedHash}`);
  } catch (error) {
    console.error("Error storing search result:", error);
    throw error;
  }
}
