import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { familyValidationSchema } from 'validationSchema/families';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFamilies();
    case 'POST':
      return createFamily();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFamilies() {
    const data = await prisma.family
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'family'));
    return res.status(200).json(data);
  }

  async function createFamily() {
    await familyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.memory?.length > 0) {
      const create_memory = body.memory;
      body.memory = {
        create: create_memory,
      };
    } else {
      delete body.memory;
    }
    const data = await prisma.family.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
