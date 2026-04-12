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
