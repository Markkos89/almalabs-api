import { Request } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async getAllRequests(): Promise<Request[]> {
    return this.prisma.request.findMany();
  }

  async getRequestById(id: number): Promise<Request> {
    return this.prisma.request.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createRequest(data: Request): Promise<Request> {
    return this.prisma.request.create({
      data,
    });
  }

  async updateRequest(id: number, data: Request): Promise<Request> {
    return this.prisma.request.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteRequest(id: number): Promise<Request> {
    return this.prisma.request.delete({
      where: {
        id: id,
      },
    });
  }
}
