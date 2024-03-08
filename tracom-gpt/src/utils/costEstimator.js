/**
 * Estimates the cost of an OpenAI API call based on the number of tokens and the cost per token.
 * 
 * @param {number} inputTokens - The number of tokens used by the user in the API call.
 * @param {number} outputTokens- The number of tokens used by the model in the API call.
 * @param {string} modelName - The name of the model that was called.
 * @returns {number} The estimated cost of the API call.
 */
function estimateCost(modelName,inputTokens, outputTokens) {

    const prices = {
        'gpt-3.5-turbo' : {'input' : 0.0000005, 'output' : 0.0000015},
        'gpt-4-turbo-preview' : {'input' : 0.00001, 'output' : 0.00003}
    }

    if (!prices[modelName]) {
        throw new Error(`Pricing information for model ${modelName} not found.`);
      }

    const cost = (inputTokens * prices[modelName].input) + (outputTokens * prices[modelName].output);

    return cost;
  }
  
  export default estimateCost;
  