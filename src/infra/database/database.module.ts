import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'

@Module({
  providers: [
    PrismaService, 
    PrismaQuestionsRepository, 
    PrismaQuestionAttachmentsRepository, 
    PrismaQuestionsCommentsRepository, 
    PrismaAnswersRepository, 
    PrismaAnswersCommentsRepository, 
    PrismaAnswersAttachmentsRepository
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRepository, 
    PrismaQuestionAttachmentsRepository, 
    PrismaQuestionsCommentsRepository, 
    PrismaAnswersRepository, 
    PrismaAnswersCommentsRepository, 
    PrismaAnswersAttachmentsRepository
  ],
})
export class DatabaseModule {}
