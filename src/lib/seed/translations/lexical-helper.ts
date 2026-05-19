export function textToParagraph(text: string, direction: 'ltr' | 'rtl' = 'ltr') {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          direction,
          format: '',
          indent: 0,
          children: [{ type: 'text', version: 1, text }],
        },
      ],
      direction,
      format: '',
      indent: 0,
      version: 1,
    },
  };
}

// Splits on blank-line boundaries so seed-side authors can write multi-paragraph copy
// as a single newline-separated string. Trims and skips empty segments.
export function textToParagraphs(text: string, direction: 'ltr' | 'rtl' = 'ltr') {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  return {
    root: {
      type: 'root',
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        version: 1,
        direction,
        format: '',
        indent: 0,
        children: [{ type: 'text', version: 1, text: p }],
      })),
      direction,
      format: '',
      indent: 0,
      version: 1,
    },
  };
}
