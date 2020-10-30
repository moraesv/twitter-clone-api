import * as Yup from 'yup'
import ValidationErrors from '../types/ValidationErrors'

export default async function validateSchema<SchemaType, ReturnType>(
  schema: object & SchemaType,
  body: ReturnType,
): Promise<{ ready?: ReturnType; errors?: ValidationErrors; hasErrors: boolean }> {
  return Yup.object()
    .shape(schema)
    .noUnknown(true)
    .validate(body, { abortEarly: false })
    .then((ready: object & ReturnType) => ({
      ready,
      errors: {},
      hasErrors: false,
    }))
    .catch((e: Yup.ValidationError) => {
      const errors: ValidationErrors = {}
      e.inner.forEach((err) => {
        errors[err.path || 'unknown'] = err.message
      })

      return { errors, hasErrors: true }
    })
}
