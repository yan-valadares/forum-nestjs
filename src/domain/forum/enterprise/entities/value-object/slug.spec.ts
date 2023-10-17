import { Slug } from './slug'

it('should be able to create a new slug from a text', () => {
  const slug = Slug.createFromText('Example test slug from text')

  expect(slug.value).toEqual('example-test-slug-from-text')
})
