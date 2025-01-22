import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {

  constructor(private prismaService: PrismaService) {}

   async create(createTaskDto: createTaskDto) {
    
    try {
      return await this.prismaService.task.create({
        data: createTaskDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Title with name ${createTaskDto.title} already exists`);
        }
      }
    }
  }

  findAll() {
    return this.prismaService.task.findMany(); 
  }

  async findOne(id: number) {
   const Taskfound = await this.prismaService.task.findUnique({ where: { id: id } });

   if (!Taskfound) {
     throw new NotFoundException(`Task with id ${id} not found`);
   }
   return Taskfound;
  }

  async update(id: number, updateTaskDto: updateTaskDto) {
    const updatedTask = await this.prismaService.task.update({
      where: { id: id },
      data: updateTaskDto,
    });
 
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }


  async remove(id: number) {
   const deletedTask = await this.prismaService.task.delete({ where: { id: id } });

   if (!deletedTask) {
     throw new NotFoundException(`Task with id ${id} not found`);
   }
   return deletedTask;
  }
}
