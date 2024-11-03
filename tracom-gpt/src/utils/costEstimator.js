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
        'gpt-3.5-turbo' : {'input' : 5, 'output' : 15},
        'gpt-4-turbo' : {'input' : 10, 'output' : 30},
        'gpt-4o' : {'input' : 2.50 , 'output' : 10},
        'o1-mini' : {'input' : 3, 'output' : 12},
        'o1-preview' : {'input' : 15, 'output' : 60},
    }

    if (!prices[modelName]) {
        throw new Error(`Pricing information for model ${modelName} not found.`);
      }

    const cost = (inputTokens * (prices[modelName].input / 1000000)) + (outputTokens * (prices[modelName].output / 1000000));

    return cost;
  }
  
  export default estimateCost;
  