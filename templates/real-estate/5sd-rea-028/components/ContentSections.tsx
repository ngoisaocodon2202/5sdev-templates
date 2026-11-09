import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Send,
} from '@shared/icons/template-icons';

export const ContentSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Làm thế nào để triển khai hoặc tùy biến dịch vụ tại Equinox?',
      a: 'Đội ngũ chuyên gia của Equinox hỗ trợ tư vấn 1-1, khảo sát nhu cầu thực tế và bàn giao lộ trình triển khai hoàn chỉnh trong vòng 24 giờ làm việc.',
    },
    {
      q: 'Chính sách bảo hành và cam kết chất lượng trong lĩnh vực Bất động sản như thế nào?',
      a: 'Toàn bộ sản phẩm và dịch vụ đều tuân thủ tiêu chuẩn chất lượng quốc tế, đi kèm hợp đồng minh bạch và hỗ trợ kỹ thuật/chăm sóc khách hàng 24/7.',
    },
    {
      q: 'Tôi có thể thanh toán linh hoạt hoặc đặt lịch hẹn trực tuyến không?',
      a: 'Có. Hệ thống tích hợp sẵn công cụ đặt lịch, dự toán chi phí và hỗ trợ đa phương thức thanh toán an toàn.',
    },
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Quân',
      role: 'Giám đốc Điều hành',
      quote: 'Trải nghiệm dịch vụ tại Equinox thực sự vượt mong đợi. Quy trình chuyên nghiệp, thiết kế tinh tế và hiệu quả rõ rệt ngay từ tuần đầu tiên.',
    },
    {
      name: 'Trần Thanh Hà',
      role: 'Khách hàng Thân thiết',
      quote: 'Sự tận tâm và chuẩn mực trong từng chi tiết giúp Equinox trở thành đối tác tin cậy hàng đầu của chúng tôi trong suốt 3 năm qua.',
    },
    {
      name: 'Lê Hoàng Nam',
      role: 'Chuyên gia Tư vấn',
      quote: 'Tiêu chuẩn chất lượng cao, minh bạch về chi phí và đội ngũ hỗ trợ phản hồi cực kỳ nhanh chóng.',
    },
  ];

  return (
    <>
      {/* 1. Core Value Propositions & Workflow */}
      <section id="features-section" className="py-16 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider opacity-70">
              GIÁ TRỊ CỐT LÕI • 5SD-REA-028
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl font-display font-black tracking-tight">
              Vì Sao Khách Hàng Tin Chọn Equinox?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Thiết kế độc bản phong cách Brutalism (swiss-modular)","Module tương tác chuyên ngành Bất động sản hoạt động thực tế","Header thông minh kèm Mobile Drawer Navigation mượt mà"].map((feat, idx) => (
              <div key={idx} className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg space-y-3">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white font-bold"
                  style={{ background: idx % 2 === 0 ? '#7C3AED' : '#EC4899' }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold">{feat}</h3>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Được tối ưu hóa chuyên biệt cho phân khúc Real Estate Agent Personal Brand, đảm bảo hiệu suất vận hành vượt trội và trải nghiệm người dùng mượt mà.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Customer Testimonials */}
      <section id="reviews-section" className="py-16 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                ĐÁNH GIÁ XÁC THỰC
              </span>
              <h2 className="mt-1 text-2xl sm:text-4xl font-display font-black tracking-tight">
                Khách Hàng Nói Gì Về Equinox
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>4.8 / 5.0 (Từ 500+ đánh giá xác thực)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg flex flex-col justify-between space-y-4">
                <p className="text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-current/10 text-xs">
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-zinc-700">{t.role}</div>
                  </div>
                  <span className="font-mono text-amber-500">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive FAQ & Lead Capture Section */}
      <section id="contact-section" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* FAQ Column */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                CÂU HỎI THƯỜNG GẶP
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight mb-4">
                Giải Đáp Nhanh Thông Tin
              </h2>
              <div className="space-y-3">
                {faqs.map((f, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-sm font-bold"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-zinc-700 leading-relaxed border-t border-current/10 pt-3">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lead Form Column */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <h3 className="text-xl font-bold mb-1">
                  Liên Hệ Tư Vấn Cùng Equinox
                </h3>
                <p className="text-xs text-zinc-700 mb-6">
                  Để lại thông tin để nhận báo giá chi tiết và ưu đãi dành riêng cho khách hàng trực tuyến.
                </p>

                {leadSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                    <h4 className="text-base font-bold">Đã gửi thông tin thành công!</h4>
                    <p className="text-xs text-zinc-700">
                      Chuyên viên tư vấn của Equinox sẽ liên hệ với bạn trong ít phút.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0901 234 567"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Nhu cầu tư vấn chi tiết</label>
                      <textarea
                        rows={3}
                        placeholder="Nhập nội dung cần hỗ trợ..."
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition rounded-lg"
                      style={{
                        background: '#000000',
                      }}
                    >
                      <Send className="h-4 w-4" />
                      <span>Gửi Yêu Cầu Tư Vấn</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
