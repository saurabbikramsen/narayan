import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Narayan Project', // Title (required)
            version: '1.0.0', // Version (required)
            description:
                'API documentation of a simple node project for my interview', // Description (optional)
        },
        tags: [
            {
                name: 'Users',
                description: 'get, create, update and delete users',
            },
        ],
    },
    // Path to the API docs
    apis: [path.resolve(__dirname, '.././routes/*.ts')],
};

const specs = swaggerJsdoc(options);

export default specs;
