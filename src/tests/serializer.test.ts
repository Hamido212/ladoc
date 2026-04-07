import { describe, it, expect } from 'vitest';
import { serialize, countWords, countCharacters } from '@/lib/typst/serializer';

const defaultOpts = {
  pageSettings: { pageSize: 'a4' as const, orientation: 'portrait' as const, margins: { top: '2.5cm', bottom: '2.5cm', left: '2.5cm', right: '2.5cm' } },
  fontFamily: 'serif',
  fontSize: '11pt',
  preamble: '',
};

describe('TypstSerializer', () => {
  it('serializes a paragraph', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello world' }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('Hello world');
  });

  it('serializes bold text', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bold', marks: [{ type: 'bold' }] }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('*Bold*');
  });

  it('serializes italic text', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Italic', marks: [{ type: 'italic' }] }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('_Italic_');
  });

  it('serializes headings', () => {
    const doc = { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Title' }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('= Title');
  });

  it('serializes h2 headings', () => {
    const doc = { type: 'doc', content: [{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Section' }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('== Section');
  });

  it('escapes special Typst characters', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello #world @test' }] }] };
    const result = serialize(doc, defaultOpts);
    expect(result).toContain('\\#');
    expect(result).toContain('\\@');
  });
});

describe('countWords', () => {
  it('counts words in a document', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello world foo' }] }] };
    expect(countWords(doc)).toBe(3);
  });

  it('returns 0 for empty document', () => {
    const doc = { type: 'doc', content: [] };
    expect(countWords(doc)).toBe(0);
  });
});

describe('countCharacters', () => {
  it('counts characters in a document', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] };
    expect(countCharacters(doc)).toBe(5);
  });
});
