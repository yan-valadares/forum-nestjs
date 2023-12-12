import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService, 
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentRepository
    }, 
    PrismaQuestionAttachmentsRepository, 
    PrismaQuestionsCommentsRepository, 
    PrismaAnswersRepository, 
    PrismaAnswersCommentsRepository, 
    PrismaAnswersAttachmentsRepository
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository, 
    PrismaQuestionAttachmentsRepository, 
    PrismaQuestionsCommentsRepository, 
    PrismaAnswersRepository, 
    PrismaAnswersCommentsRepository, 
    PrismaAnswersAttachmentsRepository
  ],
})
export class DatabaseModule {}
