import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakeHaser: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakeHaser = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(inMemoryStudentRepository, fakeHaser, fakeEncrypter)
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
        email: 'johndoe@email.com',
        password: await fakeHaser.hash('123456')
    })

    inMemoryStudentRepository.items.push(student)

    const result = await sut.execute({
        email: 'johndoe@email.com',
        password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    }) 
  })
})
