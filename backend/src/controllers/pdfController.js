import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const servePDF = async (req, res) => {
    const { filename } = req.params;

    try {
        const filePath = path.join(__dirname, '../../static/', filename);
        res.contentType("application/pdf");
        fs.createReadStream(filePath).pipe(res);
    } catch (error) {
        console.error('Error retrieving PDF', error);
        res.status(500).json({ message: 'Error retrieving PDF' });
    }
};
