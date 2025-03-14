import Fastify from 'fastify';
import { routes } from './routes/routes';
import cardRoutes from './routes/cardRoutes';
import loungeRoutes from './routes/loungeRoutes';
import rewardRoutes from './routes/rewardRoutes';
import mileageRoutes from './routes/mileageRoutes';
import zerofeeRoutes from './routes/zerofeeRoutes';
import exclusiveRoutes from './routes/exclusiveRoutes';
import cashbackRoutes from './routes/cashbackRoutes';
import requirementRoutes from './routes/requirementRoutes';
import cors from '@fastify/cors';
import { error } from 'console';

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

const start = async () => {

    await app.register(cors);
    await app.register(routes);
    await app.register(cardRoutes);
    await app.register(loungeRoutes);
    await app.register(rewardRoutes);
    await app.register(mileageRoutes);
    await app.register(zerofeeRoutes);
    await app.register(exclusiveRoutes);
    await app.register(cashbackRoutes);
    await app.register(requirementRoutes);

    try {
        await app.listen({ port: 3333 })
        console.log("🚀 Server running on http://localhost:3333");
    } catch (error) {
        process.exit(1)
    }
}

start();