'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const ContactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(120),
  phone: z.string().min(8, 'Telefone inválido').max(20),
  email: z.string().email('E-mail inválido'),
  investment: z.enum(['ate-30k', '30-80k', '80-150k', 'acima-150k', 'nao-definido']),
  message: z.string().min(5, 'Mensagem muito curta').max(2000),
  website: z.string().max(0).optional(),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'phone' | 'email' | 'investment' | 'message', string>>;
};

const investmentLabels: Record<string, string> = {
  'ate-30k': 'Até R$ 30 mil',
  '30-80k': 'R$ 30 mil – R$ 80 mil',
  '80-150k': 'R$ 80 mil – R$ 150 mil',
  'acima-150k': 'Acima de R$ 150 mil',
  'nao-definido': 'Ainda não defini',
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    investment: formData.get('investment'),
    message: formData.get('message'),
    website: formData.get('website'),
  };

  if (raw.website) {
    return { status: 'success', message: 'Mensagem enviada com sucesso!' };
  }

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactState['fieldErrors'] = {};
    for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[field as keyof typeof fieldErrors] = errors?.[0];
    }
    return { status: 'error', message: 'Verifique os campos abaixo.', fieldErrors };
  }

  const { name, phone, email, investment, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'contato@053moveis.com.br',
      to: process.env.CONTACT_TO_EMAIL || 'contato@053moveis.com.br',
      subject: `Novo orçamento: ${name}`,
      text: [
        `Nome: ${name}`,
        `Telefone: ${phone}`,
        `E-mail: ${email}`,
        `Investimento: ${investmentLabels[investment] || investment}`,
        `Mensagem:\n${message}`,
      ].join('\n'),
    });
    return { status: 'success', message: 'Mensagem enviada! Entraremos em contato em breve.' };
  } catch {
    return { status: 'error', message: 'Erro ao enviar mensagem. Tente pelo WhatsApp.' };
  }
}
