import { createTaskDto } from './create-task.dto';

type updateTaskDto = Omit < Partial < createTaskDto > , 'id' | 'createdAt' | 'updatedAt' >;

export { updateTaskDto };
