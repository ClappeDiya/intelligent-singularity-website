import '@fontsource-variable/noto-sans/index.css';
import '@fontsource-variable/noto-sans-sc/index.css';
import '@fontsource-variable/noto-sans-devanagari/index.css';
import '@fontsource-variable/noto-sans-arabic/index.css';
import '@fontsource-variable/noto-sans-bengali/index.css';
import '@fontsource-variable/noto-nastaliq-urdu/index.css';

import type { Locale } from '@/i18n/config';

export async function loadScriptFont(_locale: Locale): Promise<void> {
  // All font CSS imported statically above. Font files are loaded on demand
  // by the browser when glyphs from that font-family are actually rendered.
}
