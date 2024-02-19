import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({
    apiKey: process.env.PINCECONE_API_KEY
})

exports.queryPinecone = async (embedding) => {

};