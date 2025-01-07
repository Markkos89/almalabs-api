/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Request } from '@prisma/client';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  async getAllRequests() {
    return this.requestService.getAllRequests();
  }

  @Get(':id')
  async getRequestById(@Param('id') id: string) {
    const requestFound = await this.requestService.getRequestById(Number(id));
    if (!requestFound) throw new BadRequestException('Request does not exist');
    return requestFound;
  }

  @Post()
  async createRequest(@Body() data: Request) {
    return this.requestService.createRequest(data);
  }

  @Put(':id')
  async updateRequest(@Param('id') id: string, @Body() data: Request) {
    try {
      return await this.requestService.updateRequest(Number(id), data);
    } catch (error) {
      throw new BadRequestException('Request does not exist');
    }
  }

  @Delete(':id')
  async deleteRequest(@Param('id') id: string) {
    try {
      return await this.requestService.deleteRequest(Number(id));
    } catch (error) {
      throw new BadRequestException('Request does not exist');
    }
  }
}
