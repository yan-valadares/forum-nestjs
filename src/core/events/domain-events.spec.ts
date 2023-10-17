import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate:  CustomAggregate// eslint-disable-line

  constructor(aggreagate: CustomAggregate) {
    this.aggregate = aggreagate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber registered (listening a event)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating a response without saving it in the DB
    const aggreagate = CustomAggregate.create()

    // Making sure that the event have been created, but not dispatched
    expect(aggreagate.domainEvents).toHaveLength(1)

    // Saving the answer in the Db and dispathing the event
    DomainEvents.dispatchEventsForAggregate(aggreagate.id)

    // Subscriber listen the event and do what is supposed to do
    expect(callbackSpy).toHaveBeenCalled()

    expect(aggreagate.domainEvents).toHaveLength(0)
  })
})
