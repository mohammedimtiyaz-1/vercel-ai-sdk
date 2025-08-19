import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { boolean } from "zod";

const embedding_model = openai.embedding("text-embedding-3-small");

function generateEmbedding(input: string) {
  return input
    .split("\n")
    .map((chunk) => chunk.trim())
    .filter(boolean);
}

export async function generateEmbeddings(
  value: string
): Promise<Array<{ content: string; embedding: number[] }>> {
  const chunks = generateEmbedding(value);
  const { embeddings } = await embedMany({
    model: embedding_model,
    values: chunks,
  });
  return embeddings.map((embedding, index) => ({
    content: chunks[index],
    embedding,
  }));
}
