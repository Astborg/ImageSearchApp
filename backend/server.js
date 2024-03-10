const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path');
const cors = require('cors');
const Joi = require('joi');
const port = 3001

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello Daddy')
    
})
app.get('/api/search', async (req, res) => {
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                q: 'your_search_query',
                key: 'AIzaSyDwX_AZMC-ccgqBoXDMbI0MT5vStR-F2u8',
                cx: '33b8a48f096de4aab'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/mypictures/:userId', (req, res) => {
    const userId = req.params.userId;

   
    fs.readFile('mypictures.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const jsonData = JSON.parse(data);
        
        
        const userPictures = jsonData.filter(picture => picture.userId === userId);
       
        res.json(userPictures);
    });
});

const pictureSchema = Joi.object({
    userId: Joi.string().min(1).required(),
    url: Joi.string().uri().required(),
    title: Joi.string().min(1).required(),
    byteSize: Joi.number()
});
app.post('/api/mypictures', (req, res) => {
    const { url, title,byteSize, userId } = req.body
    console.log(req.body)
    const { error } = pictureSchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error.details);
        return res.status(400).json({ error: 'Invalid picture data', details: error.details });
    }

    fs.readFile('mypictures.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        let jsonData = JSON.parse(data);
        
        let userObject = jsonData.find(user => user.userId === userId);
        if (!userObject) {
            userObject = { userId: userId, favorites: [] };
            jsonData.push(userObject);
        }
        
        
        userObject.favorites.push({ title, byteSize, url });
        
        
        fs.writeFile('mypictures.json', JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ message: 'Data saved successfully' });
        });
    });
});


app.listen(port, () => {
    console.log('Listening on port 3001')
})