import dspy
from pinecone import Pinecone
from dotenv import load_dotenv
import os

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index = pc.Index(os.getenv("PINECONE_INDEX_NAME"))

lm = dspy.LM('openai/gpt-4o-mini')
dspy.configure(lm=lm)

embedder = dspy.Embedder('openai/text-embedding-3-small', dimensions=1536)
retriever = dspy.retrievers.Embeddings(embedder=embedder)

def retrieve_documents(query, top_k=3):
    # Embed the query using dspy's embedder
    query_embedding = retriever.embed([query])[0]

    # Perform similarity search in the Pinecone index
    results = index.query(query_embedding.tolist(), top_k=top_k, include_metadata=True)

    # Extract the documents from the results
    retrieved_docs = [match['metadata']['text'] for match in results['matches']]
    return retrieved_docs

# Define the question-answering pipeline
qa = dspy.Predict('question: str, documents: List[str] -> response: str')

# Function to generate an answer for a query
def generate_answer(query):
    # Retrieve top-k relevant documents from Pinecone
    top_k_docs = retrieve_documents(query)

    # Generate the response using the QA model
    response = qa(question=query, documents=top_k_docs)
    return response.response

# Example usage
if __name__ == "__main__":
    query = "What is SOCIAL STYLE?"
    answer = generate_answer(query)
    print("Answer:", answer)



# class RAG(dspy.Module):
#     def __init__(self):
#         self.respond = dspy.ChainOfThought('context, question -> response')

#     def forward(self, question):
#         context = search(question).passages
#         return self.respond(context=context, question=question)


