import { encoding_for_model } from "tiktoken";

export const tokenCount = async (req,res) => {

    const { input, output, settings } = req.body;
    const enc = encoding_for_model(settings.model);

    try {
        let inputTokenCount = enc.encode(input).length
        let outputTokenCount = enc.encode(output).length

        res.json({inputTokens:inputTokenCount, outputTokens: outputTokenCount})

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ message: 'Error processing Tokencount' });
    } 
}