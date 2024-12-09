import { encoding_for_model } from "tiktoken";

/**
 * Calculates the token count for the given input and output strings using the specified model settings.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.input - The input string to be tokenized.
 * @param {string} req.body.output - The output string to be tokenized.
 * @param {Object} req.body.settings - The settings object containing model information.
 * @param {string} req.body.settings.model - The model to be used for tokenization.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 * 
 * @throws {Error} - Throws an error if there is an issue with the tokenization process.
 */
export const tokenCount = async (req,res) => {

    const { input, output, settings } = req.body;
    let enc = null;

    // Edge case for o-1 model while it is in beta
    if (settings.model === 'o1-mini' || settings.model === 'o1-preview') {
         enc = encoding_for_model("gpt-4o");
    }
    else {
         enc = encoding_for_model(settings.model);
    }

    try {
        let inputTokenCount = enc.encode(input).length
        let outputTokenCount = enc.encode(output).length

        res.json({inputTokens:inputTokenCount, outputTokens: outputTokenCount})

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ message: 'Error processing Tokencount' });
    } 
}