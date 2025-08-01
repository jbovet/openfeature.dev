import { ECOSYSTEM_HOOKS } from './hooks';
import { ECOSYSTEM_OFREP_APIS, OFREPElement } from './ofrep-api';
import { ECOSYSTEM_PROVIDERS } from './providers';
import { ECOSYSTEM_SDKS } from './sdks/ecosystem';
import { ECOSYSTEM_INTEGRATONS } from './integrations';
import { EcosystemElement, Technology, Type } from './types';

export const ECOSYSTEM: (EcosystemElement | OFREPElement)[] = [
  ...ECOSYSTEM_SDKS,
  ...ECOSYSTEM_PROVIDERS,
  ...ECOSYSTEM_HOOKS,
  ...ECOSYSTEM_OFREP_APIS,
  ...ECOSYSTEM_INTEGRATONS,
].map((s) => ({
  // Creates a unique id per item for the search index
  id:
    'technology' in s && 'category' in s
      ? `${s.type}/${s.category}/${s.technology}/${s.vendor}/${s.href}`
      : `${s.type}/${s.vendor}/${s.href}`,
  ...s,
}));

export const TECHNOLOGY_COLOR_MAP: Record<Technology, string> = {
  JavaScript: 'bg-yellow-50 text-yellow-600 ring-yellow-500/10',
  Go: 'bg-sky-50 text-sky-600 ring-sky-500/10',
  Java: 'bg-amber-50 text-amber-600 ring-amber-500/10',
  ['.NET']: 'bg-violet-50 text-violet-600 ring-violet-500/10',
  PHP: 'bg-indigo-50 text-indigo-600 ring-indigo-500/10',
  Kotlin: 'bg-purple-50 text-purple-600 ring-purple-500/10',
  Python: 'bg-blue-50 text-blue-600 ring-blue-500/10',
  Swift: 'bg-orange-50 text-orange-600 ring-orange-500/10',
  Rust: 'bg-pink-50 text-pink-600 ring-pink-500/10',
  Ruby: 'bg-red-50 text-red-600 ring-red-500/10',
  React: 'bg-teal-50 text-teal-600 ring-teal-500/10',
  Angular: 'bg-red-50 text-red-600 ring-red-500/10',
  NestJS: 'bg-pink-50 text-pink-600 ring-pink-500/10',
  'Next.js': 'bg-gray-50 text-gray-600 ring-gray-500/10',
  SvelteKit: 'bg-orange-50 text-orange-600 ring-orange-500/10',
};

export const TYPE_COLOR_MAP: Record<Type, string> = {
  Hook: 'bg-green-50 text-green-600 ring-green-500/10',
  Provider: 'bg-blue-50 text-blue-600 ring-blue-500/10',
  SDK: 'bg-violet-50 text-violet-600 ring-violet-500/10',
  'OFREP API': 'bg-orange-50 text-orange-600 ring-orange-500/10',
  Integration: 'bg-gray-50 text-gray-600 ring-gray-500/10',
};
