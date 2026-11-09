import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface Props {
  templateId: string;
  templateName?: string;
  onReset?: () => void;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class PreviewErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'Lỗi không xác định khi tải giao diện template.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[PreviewErrorBoundary] Error in template ${this.props.templateId}:`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[520px] w-full flex items-center justify-center bg-slate-950 p-8 text-slate-100">
          <div className="max-w-lg w-full rounded-2xl border border-rose-500/30 bg-slate-900/90 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-mono font-semibold text-rose-300 mb-3">
              ISOLATED ERROR BOUNDARY • {this.props.templateId.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">
              Không thể hiển thị bản xem trước
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Giao diện <strong className="text-slate-200">{this.props.templateName || this.props.templateId}</strong> gặp sự cố khi khởi tạo. Hệ thống Error Boundary đã cô lập lỗi này để bảo vệ toàn bộ Marketplace.
            </p>
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3 text-left font-mono text-xs text-rose-300 mb-6 overflow-x-auto">
              {this.state.errorMessage}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition"
              >
                <RefreshCw className="h-4 w-4" />
                Tải lại Template
              </button>
              <a
                href="/templates"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại Thư viện
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
