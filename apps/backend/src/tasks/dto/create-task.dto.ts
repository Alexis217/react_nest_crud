import { Task } from '@prisma/client';

type createTaskDto = Omit < Task, 'id' | 'createdAt' | 'updatedAt' >;

export { createTaskDto };