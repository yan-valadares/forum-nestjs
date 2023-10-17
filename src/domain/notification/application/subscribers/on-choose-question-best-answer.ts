import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-case/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { ChooseBestAnswerQuestionEvent } from '@/domain/forum/enterprise/entities/events/choose-best-answer-question'

export class OnChooseBestAnswerQuestion implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      ChooseBestAnswerQuestionEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: ChooseBestAnswerQuestionEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Parabéns! Uma de suas respostas foi escolhida como a melhor!',
        content: `Sua reposta para a questão ${question.title
          .substring(0, 20)
          .concat('...')} foi escolhida pelo autor como a melhor`,
      })
    }
  }
}
