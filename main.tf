provider "aws" {
  region = "us-east-1" 
}


# Create a DynamoDB table
resource "aws_dynamodb_table" "search_results_table" {
  name           = "search_results"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "result_hash"

  attribute {
    name = "result_hash"
    type = "S"
  }

  tags = {
    Name = "Search Results Table"
  }
}