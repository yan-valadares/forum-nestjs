import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakeHaser: FakeHasher

let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakeHaser = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHaser)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
        student: inMemoryStudentRepository.items[0]
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })

    const hashedPassword = await fakeHaser.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentRepository.items[0].password).toEqual(hashedPassword)
  })
})
