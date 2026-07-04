import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const PRODUCTS = ['LSMGO', 'VLSFO', 'Marine Lubricants', 'Other'];
const LOCATIONS = ['Malé Port', 'Outer Anchorage', 'Thilafushi Anchorage'];
const SURVEY = ['Yes', 'No'];

const STEPS = [
  { id: 'vessel', label: 'Vessel' },
  { id: 'requirement', label: 'Requirement' },
  { id: 'buyer', label: 'Buyer' },
  { id: 'review', label: 'Review' },
];

const blank = {
  vesselName: '',
  imo: '',
  eta: '',
  product: '',
  quantity: '',
  location: '',
  survey: '',
  buyerCompany: '',
  buyerContact: '',
  email: '',
  phone: '',
  notes: '',
};

export default function NominationForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(blank);
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setVal = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Per-step validation gates
  const canAdvance = useMemo(() => {
    if (step === 0) return form.vesselName && form.imo && form.eta;
    if (step === 1) return form.product && form.quantity && form.location && form.survey;
    if (step === 2) return form.buyerCompany && form.buyerContact && form.email && form.phone;
    return true;
  }, [step, form]);

  const next = () => canAdvance && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (e) => {
    e.preventDefault();
    // In production this would POST to a serverless function which forwards to
    // bunker@bunkerfuelmaldives.com AND triggers a WhatsApp alert to +960 999 3997.
    setSubmitted(true);
  };

  // WhatsApp shortcut — pre-fills the message body
  const whatsAppShortcut = () => {
    const lines = [
      'Bunker Fuel Maldives — Nomination',
      form.vesselName ? `Vessel: ${form.vesselName}` : null,
      form.imo ? `IMO: ${form.imo}` : null,
      form.eta ? `ETA: ${form.eta}` : null,
      form.product ? `Product: ${form.product}` : null,
      form.quantity ? `Qty: ${form.quantity} MT` : null,
      form.location ? `Location: ${form.location}` : null,
      form.buyerCompany ? `Buyer: ${form.buyerCompany}` : null,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/9609993997?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div className="card-sand p-8 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-palm-500/12 grid place-items-center mb-5">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-palm-500">
            <path d="M5 12l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-teal-500">Nomination received.</h3>
        <p className="mt-3 text-teal-500/70 text-[15px] leading-relaxed max-w-lg mx-auto">
          Firm quotation within 24 hours on working days (Sunday–Thursday). For genuine urgent
          operational requirements, the WhatsApp line is monitored.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setForm(blank); }}
          className="mt-7 btn-teal"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="card-sand overflow-hidden">
      {/* WhatsApp shortcut bar — sits at the top per spec */}
      <button
        type="button"
        onClick={whatsAppShortcut}
        className="w-full flex items-center justify-between gap-3 px-5 sm:px-7 py-4 bg-gradient-to-r from-palm-500/8 to-lagoon-50 border-b border-teal-500/8 group"
        aria-label="Quick-send nomination via WhatsApp"
      >
        <span className="flex items-center gap-3 text-left">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-palm-500 text-white shrink-0">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.5 3.78 1.46 5.42L2 22l4.79-1.57a9.9 9.9 0 0 0 5.25 1.49h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2zm4.85 13.83c-.21.59-1.21 1.13-1.69 1.2-.43.06-.97.09-1.57-.1-.36-.11-.83-.27-1.43-.53-2.51-1.09-4.16-3.61-4.29-3.79-.13-.18-1.03-1.37-1.03-2.61s.65-1.85.88-2.1c.23-.25.5-.31.66-.31h.48c.15 0 .36-.06.56.43.21.49.7 1.7.76 1.82.06.13.1.27.02.45-.08.18-.13.29-.25.45-.13.16-.27.36-.39.48-.13.13-.27.27-.11.53.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.59.75 1.87.89.27.13.46.2.52.31.06.11.06.65-.15 1.24z"/>
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="text-[14px] font-semibold text-teal-500">Quick-send via WhatsApp</span>
            <span className="text-[12px] text-teal-500/65 tabular">+960 999 3997 · Monitored</span>
          </span>
        </span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-500/40 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Stepper */}
      <div className="px-5 sm:px-7 pt-6 sm:pt-7">
        <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="Form progress">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex-1 flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div
                className={`shrink-0 grid place-items-center w-6 h-6 rounded-full text-[11px] font-semibold tabular transition-colors duration-300 ${
                  i < step
                    ? 'bg-palm-500 text-white'
                    : i === step
                    ? 'bg-teal-500 text-white'
                    : 'bg-sand-200 text-teal-500/45'
                }`}
              >
                {i < step ? (
                  <svg viewBox="0 0 16 16" className="w-3 h-3"><path d="M3.5 8.5l3 3 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[11px] sm:text-[12px] font-medium truncate ${i === step ? 'text-teal-500' : 'text-teal-500/45'}`}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span className={`flex-1 h-[1.5px] rounded-full transition-colors duration-300 ${i < step ? 'bg-palm-500/50' : 'bg-sand-200'}`} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={onSubmit} className="px-5 sm:px-7 pb-7 pt-5 sm:pt-7">
        {/* Stable step container — locked min-height + absolute cross-fade
            prevents the footer from snapping between varying step heights. */}
        <div className="relative min-h-[460px] sm:min-h-[480px]">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 space-y-5"
              aria-live="polite"
            >
              {step === 0 && (
              <>
                <StepHeader label="Vessel particulars" hint="Three fields. Thumb-friendly." />
                <Field label="Vessel Name" required>
                  <input
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    value={form.vesselName}
                    onChange={update('vesselName')}
                    placeholder="e.g. MV Sea Lord"
                    className={inputCls}
                  />
                </Field>
                <Field label="IMO Number" required>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={7}
                    autoComplete="off"
                    value={form.imo}
                    onChange={update('imo')}
                    placeholder="7-digit IMO"
                    className={`${inputCls} font-mono tracking-wider`}
                    style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                  />
                </Field>
                <Field label="Vessel ETA at Malé / Maldives Waters" required>
                  <input
                    type="datetime-local"
                    value={form.eta}
                    onChange={update('eta')}
                    className={`${inputCls} font-mono`}
                    style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                  />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <StepHeader label="Stem requirement" hint="Product, quantity, delivery point." />
                <Field label="Product Required" required>
                  <ChipGroup
                    options={PRODUCTS}
                    value={form.product}
                    onChange={(v) => setVal('product', v)}
                    name="product"
                  />
                </Field>
                <Field label="Quantity (MT)" required>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={update('quantity')}
                    placeholder="e.g. 950"
                    className={`${inputCls} font-mono`}
                    style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                  />
                </Field>
                <Field label="Delivery Location" required>
                  <ChipGroup
                    options={LOCATIONS}
                    value={form.location}
                    onChange={(v) => setVal('location', v)}
                    name="location"
                    fullWidth
                  />
                </Field>
                <Field label="Independent Survey Required" required>
                  <ChipGroup
                    options={SURVEY}
                    value={form.survey}
                    onChange={(v) => setVal('survey', v)}
                    name="survey"
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <StepHeader label="Buyer & contact" hint="How we send your quotation." />
                <Field label="Buyer Company Name" required>
                  <input
                    type="text"
                    autoComplete="organization"
                    value={form.buyerCompany}
                    onChange={update('buyerCompany')}
                    className={inputCls}
                  />
                </Field>
                <Field label="Buyer Contact Name" required>
                  <input
                    type="text"
                    autoComplete="name"
                    value={form.buyerContact}
                    onChange={update('buyerContact')}
                    className={inputCls}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="ops@example.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone / WhatsApp" required>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+\s\-()]*"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+65 ..."
                    className={`${inputCls} font-mono`}
                    style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                  />
                </Field>
                <Field label="Additional Notes" optional>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={update('notes')}
                    placeholder="Lay can, charter party constraints, ISO 8217 add-ons…"
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <StepHeader label="Review & submit" hint="Confirm before sending." />
                <dl className="grid gap-3 sm:grid-cols-2 text-[14px]">
                  <Review label="Vessel" value={form.vesselName} />
                  <Review label="IMO" value={form.imo} tabular />
                  <Review label="ETA" value={form.eta} tabular />
                  <Review label="Product" value={form.product} />
                  <Review label="Quantity" value={form.quantity && `${form.quantity} MT`} tabular />
                  <Review label="Location" value={form.location} />
                  <Review label="Independent Survey" value={form.survey} />
                  <Review label="Buyer" value={form.buyerCompany} />
                  <Review label="Contact" value={form.buyerContact} />
                  <Review label="Email" value={form.email} />
                  <Review label="Phone" value={form.phone} tabular />
                  {form.notes && <Review label="Notes" value={form.notes} span2 />}
                </dl>
              </>
            )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="px-4 py-3 rounded-full text-[14px] font-medium text-teal-500/65 hover:text-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              className="btn-coral disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Continue
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ) : (
            <button type="submit" className="btn-coral">
              Submit Nomination
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>

        <p className="mt-5 text-[12px] text-teal-500/55 leading-relaxed">
          Nominations received outside working days are acknowledged on the next working day.
          For genuine urgent operational requirements, WhatsApp{' '}
          <a href="https://wa.me/9609993997" className="text-teal-500 underline-offset-2 hover:underline tabular">+960 999 3997</a>.
        </p>
      </form>
    </div>
  );
}

/* ──────────────── Sub-components ──────────────── */

const inputCls =
  'w-full h-12 px-4 rounded-card-sm bg-sand-50 border border-teal-500/12 text-[15px] text-teal-500 placeholder:text-teal-500/35 transition-colors focus:bg-white focus:border-lagoon-500 focus:outline-none focus:ring-0';

function StepHeader({ label, hint }) {
  return (
    <div className="pb-1">
      <h4 className="font-serif text-[20px] sm:text-[22px] text-teal-500">{label}</h4>
      {hint && <p className="text-[12.5px] text-teal-500/60 mt-1">{hint}</p>}
    </div>
  );
}

function Field({ label, required, optional, children }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-medium text-teal-500/85 mb-1.5 tracking-tight">
        {label}
        {required && <span className="text-coral-500 ml-1">*</span>}
        {optional && <span className="text-teal-500/40 ml-1 text-[11px]">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function ChipGroup({ options, value, onChange, name, fullWidth }) {
  return (
    <div className={`flex flex-wrap gap-2 ${fullWidth ? '' : ''}`} role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`px-4 h-11 rounded-full border text-[13.5px] font-medium transition-all duration-200 ${
              active
                ? 'bg-teal-500 text-white border-teal-500 shadow-sand-sm'
                : 'bg-sand-50 text-teal-500 border-teal-500/12 hover:border-lagoon-500 hover:bg-white'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Review({ label, value, tabular, span2 }) {
  if (!value) return null;
  return (
    <div className={`p-3.5 rounded-card-sm bg-sand-100 border border-teal-500/6 ${span2 ? 'sm:col-span-2' : ''}`}>
      <dt className="text-[10.5px] uppercase tracking-caps text-teal-500/55 mb-0.5">{label}</dt>
      <dd className={`text-[14px] text-teal-500 font-medium break-words ${tabular ? 'tabular' : ''}`}>{value}</dd>
    </div>
  );
}
