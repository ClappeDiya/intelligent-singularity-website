import * as migration_20260418_034712 from './20260418_034712';
import * as migration_20260427_032818_add_careers_press_security_pricing_faq_globals from './20260427_032818_add_careers_press_security_pricing_faq_globals';

export const migrations = [
  {
    up: migration_20260418_034712.up,
    down: migration_20260418_034712.down,
    name: '20260418_034712',
  },
  {
    up: migration_20260427_032818_add_careers_press_security_pricing_faq_globals.up,
    down: migration_20260427_032818_add_careers_press_security_pricing_faq_globals.down,
    name: '20260427_032818_add_careers_press_security_pricing_faq_globals'
  },
];
