'use client';
import { useState, FormEvent, ReactElement } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';
import NavbarWrapper from '@/components/layout/NavbarWrapper';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Branch {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
}

const BRANCHES: Branch[] = [
  {
    name: 'Vengara',
    address: 'Vengara, Malappuram, Kerala',
    phone: '+91 89389 16916',
    whatsapp: '918938916916',
  },
  {
    name: 'Othukkungal',
    address: 'Othukkungal, Malappuram, Kerala',
    phone: '+91 72329 16916',
    whatsapp: '917232916916',
  },
  {
    name: 'Kizhisseri',
    address: 'Kizhisseri, Malappuram, Kerala',
    phone: '+91 76999 16916',
    whatsapp: '917699916916',
  },
];

export default function ContactPage(): ReactElement {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to send');

      setIsSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError(
        'Something went wrong. Please try again or reach us via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <NavbarWrapper />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#278899] via-[#1f7a89] to-[#176b78] py-16 sm:py-20">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#a87936]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            <Sparkles className="h-3.5 w-3.5" />
            Get In Touch
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            Contact Us
          </h1>
       
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: Branches & Info */}
          <div>
            <div className="mb-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#a87936]">
                Our Locations
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#172b43] sm:text-3xl">
                Visit Our Branches
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Walk in to explore our collection, or start a WhatsApp chat with
                the nearest branch for instant assistance.
              </p>
            </div>

            {/* Branch Cards */}
            <div className="space-y-4">
              {BRANCHES.map((branch) => {
                const whatsappUrl = `https://wa.me/${
                  branch.whatsapp
                }?text=${encodeURIComponent(
                  `Hi Siyana Gold & Diamonds (${branch.name}), I'd like to enquire about your jewellery collection.`
                )}`;
                return (
                  <div
                    key={branch.name}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#176b78]/40 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e8f1f1] text-[#176b78]">
                            <MapPin className="h-4 w-4" />
                          </span>
                          <h3 className="font-serif text-lg font-semibold text-[#172b43]">
                            {branch.name}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {branch.address}
                        </p>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, '')}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-[#176b78]"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#176b78]" />
                          {branch.phone}
                        </a>
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5b] active:scale-[0.98]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Other contact info */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-[#eee9e1] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7eddd] text-[#a66a1c]">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#172b43]">
                    Email Us
                  </h3>
                  <a
                    href="mailto:siyanagoldndiamonds@gmail.com"
                    className="mt-1 block break-words text-xs text-slate-600 transition hover:text-[#176b78] sm:text-sm"
                  >
                    siyanagoldndiamonds@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[#eee9e1] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f1f1] text-[#176b78]">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#172b43]">
                    Store Hours
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    Monday – Sunday
                  </p>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    9:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="rounded-2xl border border-[#ece7df] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-[#172b43] sm:text-3xl">
              Send us a Message
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and our team will get back to you within 24
              hours.
            </p>

            {isSubmitted ? (
              <div className="mt-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#172b43]">
                  Message Sent!
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Thank you for contacting us. We&apos;ll respond shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#176b78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#125763]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#176b78] focus:ring-2 focus:ring-[#176b78]/20"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#176b78] focus:ring-2 focus:ring-[#176b78]/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#176b78] focus:ring-2 focus:ring-[#176b78]/20"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#176b78] focus:ring-2 focus:ring-[#176b78]/20"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="custom-design">Custom Design</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#176b78] focus:ring-2 focus:ring-[#176b78]/20"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b78] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#176b78]/20 transition hover:bg-[#125763] disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Your details are safe with us. We never share your
                  information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}