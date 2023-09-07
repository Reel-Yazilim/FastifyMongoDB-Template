import { FastifyRequest } from "fastify/types/request";

interface FastifyRequestWithJWT extends FastifyRequest {
  jwtVerify(): Promise<void>;
}
