import { ContactForm } from '@/components/pages/ContactForm';
import { fetchContactPage } from '@/lib/payload';

export default async function ContactPage() {
  const contact = await fetchContactPage('en');
  return (
    <article className="px-12 py-[120px] max-w-[920px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Contact</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {contact.title}
      </h1>
      <p className="font-[var(--font-serif)] italic text-[22px] leading-[1.55] text-[var(--color-cream-soft)] mb-[72px]">{contact.lead}</p>
      <ContactForm successMessage={contact.successMessage} errorMessage={contact.errorMessage} privacyNote={contact.privacyNote} />
    </article>
  );
}
