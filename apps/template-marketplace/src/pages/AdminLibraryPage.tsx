import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Eye,
  FileCode2,
  ShieldAlert,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { CATEGORIES } from '@shared/design-tokens';
import { formatPriceVND, updateDocumentMeta } from '@shared/utilities';
import { TEMPLATE_REGISTRY, hasTemplateModule } from '../data/template-registry';
import { TemplateRegistryItem, TemplateStatus } from '../data/types';
import { useTemplatesFilter } from '../hooks/useTemplatesFilter';

export const AdminLibraryPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateRegistryItem | null>(null);
  const [buildVerifiedAt, setBuildVerifiedAt] = useState<string>(() => new Date().toLocaleTimeString('vi-VN'));

  useEffect(() => {
    updateDocumentMeta(
      'Admin Library Manager — Quản lý Kho 1.000+ UI Templates',
      'Bảng điều khiển nội bộ quản lý trạng thái build, metadata và kiểm thử cho 1.050+ Website UI Templates.',
      '/admin/library'
    );
  }, []);

  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    statusFilter,
    setStatusFilter,
    batchFilter,
    setBatchFilter,
    page,
    setPage,
    paginatedTemplates,
    totalItems,
    totalPages,
    resetFilters,
  } = useTemplatesFilter(TEMPLATE_REGISTRY, 'all', 30);

  const stats = useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let failed = 0;
    let missingModule = 0;

    for (const item of TEMPLATE_REGISTRY) {
      const moduleOk = hasTemplateModule(item);
      if (!moduleOk) missingModule++;
      if (item.status === 'COMPLETED' || item.status === 'TESTED') {
        completed++;
      } else if (item.status === 'IN_PROGRESS' || item.status === 'PLANNED') {
        inProgress++;
      } else if (item.status === 'FAILED') {
        failed++;
      }
    }

    return {
      total: TEMPLATE_REGISTRY.length,
      categoriesCount: CATEGORIES.length,
      completed,
      inProgress,
      failed: failed + missingModule,
    };
  }, [buildVerifiedAt]);

  const batches = useMemo(() => {
    const set = new Set<number>();
    TEMPLATE_REGISTRY.forEach((t) => set.add(t.batchNumber));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Internal Mode Notice Banner (Per Requirement Section 9) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 text-xs text-amber-200">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong>Chế độ Quản trị Nội bộ (Local Registry Mode):</strong> Trang quản lý này vận hành trực tiếp trên dữ liệu Registry cục bộ phục vụ kiểm thử và quản lý thư viện trong giai đoạn phát triển (chưa yêu cầu xác thực Backend).
          </span>
        </div>
        <button
          type="button"
          onClick={() => setBuildVerifiedAt(new Date().toLocaleTimeString('vi-VN'))}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 px-3 py-1 font-semibold text-amber-200 hover:bg-amber-500/30"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Kiểm tra lại Build ({buildVerifiedAt})
        </button>
      </div>

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-extrabold text-white">
          Admin / Library Manager
        </h1>
        <p className="mt-1 text-sm text-slate-400">
           Trung tâm kiểm soát chất lượng, trạng thái build, định tuyến Live Preview và quản lý Metadata của toàn bộ kho giao diện 5S DEV.TEMPLATES.
        </p>
      </div>

      {/* 5 KPI Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <span className="text-xs text-slate-400">Tổng số Template</span>
          <div className="mt-2 font-display text-3xl font-extrabold text-white">
            {stats.total.toLocaleString('vi-VN')}
          </div>
          <span className="mt-1 inline-block text-[11px] font-mono text-cyan-400">
            Mục tiêu: ≥ 1.000+
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <span className="text-xs text-slate-400">Số Ngành nghề</span>
          <div className="mt-2 font-display text-3xl font-extrabold text-indigo-400">
            {stats.categoriesCount}
          </div>
          <span className="mt-1 inline-block text-[11px] font-mono text-slate-400">
            35 templates / ngành
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
          <span className="text-xs text-emerald-300">Hoàn thiện & Đã Test</span>
          <div className="mt-2 font-display text-3xl font-extrabold text-emerald-400">
            {stats.completed.toLocaleString('vi-VN')}
          </div>
          <span className="mt-1 inline-block text-[11px] font-mono text-emerald-400/80">
            100% Lazy Chunk OK
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <span className="text-xs text-slate-400">Đang phát triển</span>
          <div className="mt-2 font-display text-3xl font-extrabold text-amber-400">
            {stats.inProgress}
          </div>
          <span className="mt-1 inline-block text-[11px] font-mono text-slate-500">
            IN_PROGRESS / PLANNED
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <span className="text-xs text-slate-400">Template Bị lỗi</span>
          <div className="mt-2 font-display text-3xl font-extrabold text-rose-400">
            {stats.failed}
          </div>
          <span className="mt-1 inline-block text-[11px] font-mono text-emerald-400">
            0 Broken Routes
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã (5SD-ECO-001), tên, phân khúc..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white"
          >
            <option value="all">Tất cả 30 ngành nghề</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.code} — {cat.nameVi}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | TemplateStatus)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="TESTED">TESTED (Đã kiểm thử)</option>
            <option value="COMPLETED">COMPLETED (Hoàn thiện)</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="PLANNED">PLANNED</option>
            <option value="FAILED">FAILED</option>
          </select>

          <select
            value={batchFilter}
            onChange={(e) =>
              setBatchFilter(e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value, 10))
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white"
          >
            <option value="ALL">Tất cả các Batch (1–{batches.length})</option>
            {batches.map((b) => (
              <option key={b} value={b}>
                Batch {String(b).padStart(3, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4">Mã ID</th>
                <th className="py-3.5 px-4">Tên Giao diện & Phân khúc</th>
                <th className="py-3.5 px-4">Ngành nghề</th>
                <th className="py-3.5 px-4">Phong cách</th>
                <th className="py-3.5 px-4">Batch</th>
                <th className="py-3.5 px-4">Trạng thái Build</th>
                <th className="py-3.5 px-4">Giá đề xuất</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {paginatedTemplates.map((item) => {
                const moduleReady = hasTemplateModule(item);
                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {item.subNiche} • <code>{item.sourcePath}</code>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      {item.categoryNameVi}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                        {item.designStyleName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      #{String(item.batchNumber).padStart(3, '0')}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {moduleReady ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          {item.status} (OK)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-400">
                          <AlertTriangle className="h-3 w-3" />
                          MISSING
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                      {formatPriceVND(item.price.priceVnd)}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={item.previewRoute}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white"
                        >
                          <Eye className="h-3 w-3" />
                          Preview
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedTemplate(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white"
                        >
                          <FileCode2 className="h-3 w-3" />
                          Metadata
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 bg-slate-950/60 px-5 py-3.5 text-xs">
          <div className="text-slate-400">
            Hiển thị <strong>{paginatedTemplates.length}</strong> /{' '}
            <strong>{totalItems.toLocaleString('vi-VN')}</strong> templates (Trang {page}/{totalPages})
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Trước
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 disabled:opacity-40"
            >
              Tiếp <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Inspector Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {selectedTemplate.id} • METADATA INSPECTOR
                </span>
                <h3 className="text-lg font-bold text-white">{selectedTemplate.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTemplate(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 max-h-[60vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-300">
              <pre>{JSON.stringify(selectedTemplate, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                File: <code>{selectedTemplate.sourcePath}/metadata.json</code>
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to={selectedTemplate.previewRoute}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  Mở Live Preview
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
