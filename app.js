import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit  from 'express-rate-limit';
import dotenv from 'dotenv';
// swagger packages
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// General setup
const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(bodyParser.urlencoded({extended:false, limit:10}));
app.use(bodyParser.json());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.set('trust proxy', 1);
app.get('/ip', (request, response) => response.send(request.ip));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Swagger UI Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Security setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// testing
app.get('/demo', (req, res) => {
    res.send('My e-Commerce web api with node, express and mongodb');
});

// routes 


// error middleware

const PORT = process.env.PORT || 3000;
const port = 5000;
const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        }) 
    } catch(error) {
        console.log(error)
    }
}
start();






