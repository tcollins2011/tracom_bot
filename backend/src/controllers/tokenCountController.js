import { getTokenCount, deleteTokenCount } from "../services/tokenCountsCacheService.js";

export const tokenCount = (req,res) => {
    const { cacheKey } = req.params;
    const tokenCounts = getTokenCount(cacheKey);

    if (tokenCounts) {
        res.json(tokenCounts);
        deleteTokenCount(cacheKey);
    } else {
        res.status(404).json({message: 'Token counts not found'});
    }
}