import { thesisTemplate } from './thesis';
import { cvTemplate } from './cv';
import { letterTemplate } from './letter';
import { reportTemplate } from './report';
import { presentationTemplate } from './presentation';
import { bookTemplate } from './book';
import { invoiceTemplate } from './invoice';
import { minutesTemplate } from './minutes';
import type { Template } from './types';

export type { Template } from './types';

export const templates: Template[] = [
  thesisTemplate,
  cvTemplate,
  letterTemplate,
  reportTemplate,
  presentationTemplate,
  bookTemplate,
  invoiceTemplate,
  minutesTemplate,
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
