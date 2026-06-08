import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Contact us</p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">Get in touch with our team</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">Whether you have a question, request or need help with an order, our support team is here to help you quickly and personally.</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <div className="flex items-center gap-4 text-orange-600">
                <FaMapMarkerAlt />
                <div>
                  <p className="font-semibold text-slate-900">Store location</p>
                  <p className="text-sm text-slate-500">123 Book Avenue, New York, NY</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <div className="flex items-center gap-4 text-orange-600">
                <FaEnvelope />
                <div>
                  <p className="font-semibold text-slate-900">Email us</p>
                  <p className="text-sm text-slate-500">support@ibid.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft sm:col-span-2">
              <div className="flex items-center gap-4 text-orange-600">
                <FaPhone />
                <div>
                  <p className="font-semibold text-slate-900">Call us</p>
                  <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <label className="block text-sm font-semibold text-slate-900">Name</label>
            <input type="text" placeholder="Your name" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900">Email</label>
            <input type="email" placeholder="you@example.com" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900">Message</label>
            <textarea rows="5" placeholder="How can we help?" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-orange-500"></textarea>
          </div>
          <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">Send message</button>
        </form>
      </div>
    </div>
  );
}
