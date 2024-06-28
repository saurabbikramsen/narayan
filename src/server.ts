import express from 'express';
import { port } from './constants/env.constants';
import { connectToMongoDB } from './config/mongodb.config';
import specs from './config/swagger.config';
import swaggerUi from 'swagger-ui-express';
import orderRoutes from './routes/order/order';
import productRoutes from './routes/product/product';
import userRoutes from './routes/user/user';
import domainRoutes from './routes/domainRegistration/domain.registration';

const app = express();

app.use(express.json());

connectToMongoDB();

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/domain', domainRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    console.log(`server is running on http://localhost:${port}/api-docs`);
});
