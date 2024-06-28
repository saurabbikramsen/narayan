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
            {
                name: 'Products',
                description: 'get, create, update and delete products',
            },
            {
                name: 'Orders',
                description: 'get, create, update and delete orders',
            },
        ],
    },
    // Path to the API docs
    apis: [
        path.resolve(__dirname, '../routes/product/*.ts'),
        path.resolve(__dirname, '../routes/user/*.ts'),
        path.resolve(__dirname, '../routes/order/*.ts'),
    ],
};

const specs = swaggerJsdoc(options);

export default specs;
