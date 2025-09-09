import z from 'zod';
import { useTranslations } from 'next-intl';

export function useFormSchema() {
  const t = useTranslations('Sign');

  return z.object({
    email: z.email({ error: t('emailTypeError') }),
    password: z
      .string()
      .min(8, { error: t('passwordLengthError') })
      .refine((value) => /\p{Ll}/u.test(value), {
        error: t('passwordLowercaseError'),
      })
      .refine((value) => /\p{Lu}/u.test(value), {
        error: t('passwordUppercaseError'),
      })
      .refine((value) => /[0-9]/.test(value), {
        error: t('passwordNumberError'),
      })
      .refine((value) => /[^\p{L}\p{N}]/u.test(value), {
        error: t('passwordSpecialError'),
      }),
  });
}

export type FormData = z.infer<ReturnType<typeof useFormSchema>>;
