import React from 'react';
import registryData from './template-registry.json';
import { TemplateRegistryItem } from './types';

export const TEMPLATE_REGISTRY: TemplateRegistryItem[] = registryData as TemplateRegistryItem[];

// Vite dynamic code-splitting loader for all templates in /templates/*/*/page.tsx
const templateModules = import.meta.glob<{ default: React.ComponentType<any> }>(
  '/templates/*/*/page.tsx'
);

const lazyComponentCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

export function getTemplateBySlug(slug: string): TemplateRegistryItem | undefined {
  const normalized = slug.trim().toLowerCase();
  return TEMPLATE_REGISTRY.find(
    (item) => item.slug.toLowerCase() === normalized || item.id.toLowerCase() === normalized
  );
}

export function hasTemplateModule(item: TemplateRegistryItem): boolean {
  const modulePath = `/templates/${item.category}/${item.slug}/page.tsx`;
  return Boolean(templateModules[modulePath]);
}

export function getLazyTemplateComponent(
  item: TemplateRegistryItem
): React.LazyExoticComponent<React.ComponentType<any>> | null {
  const modulePath = `/templates/${item.category}/${item.slug}/page.tsx`;
  const loader = templateModules[modulePath];
  if (!loader) {
    return null;
  }
  if (!lazyComponentCache.has(modulePath)) {
    lazyComponentCache.set(modulePath, React.lazy(loader));
  }
  return lazyComponentCache.get(modulePath)!;
}
