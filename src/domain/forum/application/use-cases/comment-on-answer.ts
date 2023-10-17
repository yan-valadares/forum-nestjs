import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  { answerComment: AnswerComment }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentRepository: AnswersCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
