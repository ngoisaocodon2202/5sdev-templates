import { useMemo, useState } from 'react';
import { TemplateRegistryItem, TemplateStatus } from '../data/types';

export type PriceFilterType = 'all' | 'free' | 'paid' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';
export type SortOptionType = 'featured' | 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'code-asc';

export interface FilterState {
  searchQuery: string;
  category: string;
  designStyle: string;
  priceFilter: PriceFilterType;
  techFilter: string;
  statusFilter: 'ALL' | TemplateStatus;
  batchFilter: number | 'ALL';
  sortBy: SortOptionType;
  page: number;
  pageSize: number;
}

export function useTemplatesFilter(
  templates: TemplateRegistryItem[],
  initialCategory = 'all',
  initialPageSize = 24
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [designStyle, setDesignStyle] = useState('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilterType>('all');
  const [techFilter, setTechFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TemplateStatus>('ALL');
  const [batchFilter, setBatchFilter] = useState<number | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortOptionType>('featured');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = templates.filter((item) => {
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      if (designStyle !== 'all' && item.designStyle !== designStyle) {
        return false;
      }
      if (priceFilter === 'free' && !item.price.isFree) {
        return false;
      }
      if (priceFilter === 'paid' && item.price.isFree) {
        return false;
      }
      if (
        (priceFilter === 'STANDARD' || priceFilter === 'PREMIUM' || priceFilter === 'ENTERPRISE') &&
        item.price.tier !== priceFilter
      ) {
        return false;
      }
      if (techFilter !== 'all' && !item.techStack.some((t) => t.toLowerCase().includes(techFilter.toLowerCase()))) {
        return false;
      }
      if (statusFilter !== 'ALL' && item.status !== statusFilter) {
        return false;
      }
      if (batchFilter !== 'ALL' && item.batchNumber !== batchFilter) {
        return false;
      }

      if (q.length > 0) {
        const matchId = item.id.toLowerCase().includes(q);
        const matchName = item.name.toLowerCase().includes(q) || item.nameVi.toLowerCase().includes(q);
        const matchCat =
          item.category.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.categoryNameVi.toLowerCase().includes(q);
        const matchSubNiche = item.subNiche.toLowerCase().includes(q);
        const matchStyle = item.designStyleName.toLowerCase().includes(q);
        const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchId || matchName || matchCat || matchSubNiche || matchStyle || matchTags;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloadsCount - a.downloadsCount;
        case 'newest':
          return b.batchNumber - a.batchNumber || b.id.localeCompare(a.id);
        case 'price-asc':
          return a.price.priceVnd - b.price.priceVnd;
        case 'price-desc':
          return b.price.priceVnd - a.price.priceVnd;
        case 'code-asc':
          return a.id.localeCompare(b.id);
        case 'featured':
        default:
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return b.rating - a.rating || a.id.localeCompare(b.id);
      }
    });
  }, [templates, searchQuery, category, designStyle, priceFilter, techFilter, statusFilter, batchFilter, sortBy]);

  const totalItems = filteredTemplates.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedTemplates = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredTemplates.slice(start, start + pageSize);
  }, [filteredTemplates, safePage, pageSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setDesignStyle('all');
    setPriceFilter('all');
    setTechFilter('all');
    setStatusFilter('ALL');
    setBatchFilter('ALL');
    setSortBy('featured');
    setPage(1);
  };

  return {
    searchQuery,
    setSearchQuery: (v: string) => {
      setSearchQuery(v);
      setPage(1);
    },
    category,
    setCategory: (v: string) => {
      setCategory(v);
      setPage(1);
    },
    designStyle,
    setDesignStyle: (v: string) => {
      setDesignStyle(v);
      setPage(1);
    },
    priceFilter,
    setPriceFilter: (v: PriceFilterType) => {
      setPriceFilter(v);
      setPage(1);
    },
    techFilter,
    setTechFilter: (v: string) => {
      setTechFilter(v);
      setPage(1);
    },
    statusFilter,
    setStatusFilter: (v: 'ALL' | TemplateStatus) => {
      setStatusFilter(v);
      setPage(1);
    },
    batchFilter,
    setBatchFilter: (v: number | 'ALL') => {
      setBatchFilter(v);
      setPage(1);
    },
    sortBy,
    setSortBy: (v: SortOptionType) => {
      setSortBy(v);
      setPage(1);
    },
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    filteredTemplates,
    paginatedTemplates,
    totalItems,
    totalPages,
    resetFilters,
  };
}
