import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Droplets, Shield, Zap, ChevronRight } from 'lucide-react';

/* ── Import scoped stylesheet ──────────────────────────────── */
import '../styles/bold-typography.css';

/* ── Import Bold Typography primitives ─────────────────────── */
import {
    BoldButton,
    BoldCard,
    BoldInput,
    SectionHeading,
    BoldDivider,
    ScrollFadeIn,
} from '../components/ui-bold';

/* ============================================================
   Design Preview — Standalone showcase of the Bold Typography
   design system. Lives at /design-preview.
   ============================================================ */
const DesignPreview: React.FC = () => {
    return (
        <div className="bold-typography-theme" style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Noise grain overlay */}
            <div className="bt-noise" />

            {/* ── Navigation Bar ──────────────────────────────────── */}
            <nav
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--bt-space-4) var(--bt-space-8)',
                    borderBottom: '1px solid var(--bt-color-border-subtle)',
                    background: 'rgba(5, 5, 5, 0.85)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Link
                    to="/"
                    style={{
                        fontFamily: 'var(--bt-font-body)',
                        fontWeight: 800,
                        fontSize: 'var(--bt-text-sm)',
                        letterSpacing: 'var(--bt-tracking-widest)',
                        textTransform: 'uppercase',
                        color: 'var(--bt-color-text-primary)',
                        textDecoration: 'none',
                    }}
                >
                    LifeNFT
                </Link>
                <span className="bt-label" style={{ color: 'var(--bt-color-text-muted)' }}>
                    Bold Typography — Design Preview
                </span>
            </nav>

            {/* ── Hero Section ────────────────────────────────────── */}
            <section
                style={{
                    padding: 'var(--bt-space-32) var(--bt-space-8) var(--bt-space-24)',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                }}
            >
                {/* Large decorative letter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-40px',
                        fontFamily: 'var(--bt-font-display)',
                        fontSize: '28rem',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        color: 'var(--bt-color-text-primary)',
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                >
                    B
                </motion.div>

                <SectionHeading
                    eyebrow="Design System v1.0"
                    title="Bold Typography"
                    subtitle="A sharp, editorial design language built for LifeNFT. Zero border-radius. No shadows. Pure typographic hierarchy. Blood-red accents."
                    preset="display"
                    size="xl"
                />

                <div style={{ display: 'flex', gap: 'var(--bt-space-4)', marginTop: 'var(--bt-space-8)', flexWrap: 'wrap' }}>
                    <BoldButton variant="primary" icon={<ArrowRight size={16} />}>
                        Get Started
                    </BoldButton>
                    <BoldButton variant="secondary">
                        View Components
                    </BoldButton>
                    <BoldButton variant="ghost">
                        Learn More
                    </BoldButton>
                </div>
            </section>

            <BoldDivider accent spacing="lg" />

            {/* ── Typography Scale ────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Typography"
                    title="Type Scale"
                    subtitle="The full range of type sizes used across the system. Display headings use Playfair Display italic, body text uses Inter Tight."
                    preset="sans"
                    size="md"
                />

                <div style={{ marginTop: 'var(--bt-space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--bt-space-6)' }}>
                    {[
                        { label: '8XL / 96px', size: 'var(--bt-text-8xl)', font: 'display' },
                        { label: '7XL / 72px', size: 'var(--bt-text-7xl)', font: 'display' },
                        { label: '5XL / 48px', size: 'var(--bt-text-5xl)', font: 'display' },
                        { label: '4XL / 36px', size: 'var(--bt-text-4xl)', font: 'sans' },
                        { label: '2XL / 24px', size: 'var(--bt-text-2xl)', font: 'sans' },
                        { label: 'LG / 18px', size: 'var(--bt-text-lg)', font: 'sans' },
                        { label: 'BASE / 16px', size: 'var(--bt-text-base)', font: 'sans' },
                        { label: 'SM / 14px', size: 'var(--bt-text-sm)', font: 'sans' },
                    ].map((item, i) => (
                        <ScrollFadeIn key={i} delay={i * 0.06}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: 'var(--bt-space-6)',
                                    borderBottom: '1px solid var(--bt-color-border-subtle)',
                                    paddingBottom: 'var(--bt-space-4)',
                                }}
                            >
                                <span className="bt-mono" style={{ minWidth: '120px', color: 'var(--bt-color-text-muted)' }}>
                                    {item.label}
                                </span>
                                <span
                                    className={item.font === 'display' ? 'bt-heading-display' : 'bt-heading-sans'}
                                    style={{ fontSize: item.size }}
                                >
                                    LifeNFT
                                </span>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </section>

            <BoldDivider spacing="lg" />

            {/* ── Button Variants ─────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Components"
                    title="Buttons"
                    subtitle="Three variants: primary (filled), secondary (outlined), and ghost (underline only). All zero-radius."
                    preset="sans"
                    size="md"
                />

                <div style={{ marginTop: 'var(--bt-space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--bt-space-8)' }}>
                    {/* Row: Sizes */}
                    <ScrollFadeIn>
                        <span className="bt-label" style={{ marginBottom: 'var(--bt-space-3)', display: 'block' }}>Primary — sizes</span>
                        <div style={{ display: 'flex', gap: 'var(--bt-space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                            <BoldButton size="sm">Small</BoldButton>
                            <BoldButton size="md">Medium</BoldButton>
                            <BoldButton size="lg" icon={<Zap size={18} />}>Large + Icon</BoldButton>
                        </div>
                    </ScrollFadeIn>

                    <ScrollFadeIn delay={0.1}>
                        <span className="bt-label" style={{ marginBottom: 'var(--bt-space-3)', display: 'block' }}>Secondary</span>
                        <div style={{ display: 'flex', gap: 'var(--bt-space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                            <BoldButton variant="secondary" size="sm">Outlined SM</BoldButton>
                            <BoldButton variant="secondary" size="md">Outlined MD</BoldButton>
                            <BoldButton variant="secondary" size="lg" icon={<Shield size={18} />}>Outlined LG</BoldButton>
                        </div>
                    </ScrollFadeIn>

                    <ScrollFadeIn delay={0.2}>
                        <span className="bt-label" style={{ marginBottom: 'var(--bt-space-3)', display: 'block' }}>Ghost (Underline)</span>
                        <div style={{ display: 'flex', gap: 'var(--bt-space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
                            <BoldButton variant="ghost">Read more</BoldButton>
                            <BoldButton variant="ghost" icon={<ChevronRight size={14} />}>View all</BoldButton>
                        </div>
                    </ScrollFadeIn>
                </div>
            </section>

            <BoldDivider accent spacing="lg" />

            {/* ── Cards ───────────────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Components"
                    title="Cards"
                    subtitle="Flat, sharp-edged containers. Optional blood-red accent top bar for feature emphasis."
                    preset="sans"
                    size="md"
                />

                <div
                    style={{
                        marginTop: 'var(--bt-space-8)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--bt-space-6)',
                    }}
                >
                    <ScrollFadeIn>
                        <BoldCard accentTop padding="lg">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bt-space-3)', marginBottom: 'var(--bt-space-4)' }}>
                                <Heart size={20} style={{ color: 'var(--bt-color-blood-light)' }} />
                                <span className="bt-heading-sans" style={{ fontSize: 'var(--bt-text-sm)' }}>Donate Blood</span>
                            </div>
                            <p className="bt-body" style={{ fontSize: 'var(--bt-text-sm)', marginBottom: 'var(--bt-space-6)' }}>
                                Every donation saves up to three lives. Earn blockchain-verified NFT badges for your contributions.
                            </p>
                            <BoldButton variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                                Start now
                            </BoldButton>
                        </BoldCard>
                    </ScrollFadeIn>

                    <ScrollFadeIn delay={0.1}>
                        <BoldCard accentTop padding="lg">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bt-space-3)', marginBottom: 'var(--bt-space-4)' }}>
                                <Droplets size={20} style={{ color: 'var(--bt-color-blood-light)' }} />
                                <span className="bt-heading-sans" style={{ fontSize: 'var(--bt-text-sm)' }}>Blood Bank</span>
                            </div>
                            <p className="bt-body" style={{ fontSize: 'var(--bt-text-sm)', marginBottom: 'var(--bt-space-6)' }}>
                                Hospitals verify donations on-chain. Real-time inventory tracking for every blood type.
                            </p>
                            <BoldButton variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                                View inventory
                            </BoldButton>
                        </BoldCard>
                    </ScrollFadeIn>

                    <ScrollFadeIn delay={0.2}>
                        <BoldCard accentTop padding="lg">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bt-space-3)', marginBottom: 'var(--bt-space-4)' }}>
                                <Shield size={20} style={{ color: 'var(--bt-color-blood-light)' }} />
                                <span className="bt-heading-sans" style={{ fontSize: 'var(--bt-text-sm)' }}>Government</span>
                            </div>
                            <p className="bt-body" style={{ fontSize: 'var(--bt-text-sm)', marginBottom: 'var(--bt-space-6)' }}>
                                Transparent oversight with blockchain-backed audit trails and national-level reporting dashboards.
                            </p>
                            <BoldButton variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                                Dashboard
                            </BoldButton>
                        </BoldCard>
                    </ScrollFadeIn>
                </div>

                {/* Card without accent */}
                <ScrollFadeIn delay={0.15} style={{ marginTop: 'var(--bt-space-6)' }}>
                    <BoldCard padding="lg">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--bt-space-4)' }}>
                            <div>
                                <span className="bt-label" style={{ marginBottom: 'var(--bt-space-2)', display: 'block' }}>Stats</span>
                                <span className="bt-heading-display" style={{ fontSize: 'var(--bt-text-4xl)' }}>12,847</span>
                                <p className="bt-body" style={{ fontSize: 'var(--bt-text-sm)', marginTop: 'var(--bt-space-1)' }}>
                                    Total donations verified on Hive blockchain
                                </p>
                            </div>
                            <BoldButton variant="secondary" size="sm" icon={<ArrowRight size={14} />}>
                                View report
                            </BoldButton>
                        </div>
                    </BoldCard>
                </ScrollFadeIn>
            </section>

            <BoldDivider spacing="lg" />

            {/* ── Inputs ──────────────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Components"
                    title="Form Inputs"
                    subtitle="Minimal, sharp-edged inputs with uppercase labels and clear focus states."
                    preset="sans"
                    size="md"
                />

                <ScrollFadeIn>
                    <div
                        style={{
                            marginTop: 'var(--bt-space-8)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'var(--bt-space-6)',
                            maxWidth: '700px',
                        }}
                    >
                        <BoldInput label="Full Name" placeholder="Atharva Sharma" />
                        <BoldInput label="Email" placeholder="you@example.com" type="email" />
                        <BoldInput label="Blood Type" placeholder="e.g. O+" />
                        <BoldInput label="Hive Username" placeholder="@your-hive-id" helperText="Used for NFT minting" />
                        <BoldInput label="Error State" placeholder="Invalid input" error="This field is required" />
                    </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={0.15}>
                    <div style={{ marginTop: 'var(--bt-space-8)', maxWidth: '400px' }}>
                        <BoldButton variant="primary" fullWidth icon={<ArrowRight size={16} />}>
                            Submit Registration
                        </BoldButton>
                    </div>
                </ScrollFadeIn>
            </section>

            <BoldDivider accent spacing="lg" />

            {/* ── Color Palette ───────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Tokens"
                    title="Color Palette"
                    subtitle="The full color system — backgrounds, text hierarchies, blood-red accents, and semantic colors."
                    preset="sans"
                    size="md"
                />

                <ScrollFadeIn>
                    <div
                        style={{
                            marginTop: 'var(--bt-space-8)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: 'var(--bt-space-2)',
                        }}
                    >
                        {[
                            { name: 'BG', color: '#050505' },
                            { name: 'BG Elevated', color: '#0c0c0c' },
                            { name: 'BG Card', color: '#111111' },
                            { name: 'Surface', color: '#1a1a1a' },
                            { name: 'Border', color: '#2a2a2a' },
                            { name: 'Text Primary', color: '#f5f5f5' },
                            { name: 'Text Secondary', color: '#a0a0a0' },
                            { name: 'Text Muted', color: '#666666' },
                            { name: 'Blood', color: '#c62828' },
                            { name: 'Blood Light', color: '#e53935' },
                            { name: 'Blood Dark', color: '#8e0000' },
                            { name: 'Success', color: '#66bb6a' },
                            { name: 'Warning', color: '#ffa726' },
                            { name: 'Error', color: '#ef5350' },
                        ].map((swatch) => (
                            <div key={swatch.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '64px',
                                        background: swatch.color,
                                        border: '1px solid var(--bt-color-border)',
                                    }}
                                />
                                <span className="bt-mono" style={{ fontSize: '10px', color: 'var(--bt-color-text-muted)' }}>
                                    {swatch.name}
                                </span>
                                <span className="bt-mono" style={{ fontSize: '10px', color: 'var(--bt-color-text-muted)' }}>
                                    {swatch.color}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollFadeIn>
            </section>

            <BoldDivider spacing="lg" />

            {/* ── Mono / Labels ───────────────────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Typography"
                    title="Mono & Labels"
                    subtitle="JetBrains Mono for code and data. Uppercase tracked labels for section eyebrows."
                    preset="sans"
                    size="md"
                />

                <ScrollFadeIn>
                    <div style={{ marginTop: 'var(--bt-space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--bt-space-6)' }}>
                        <BoldCard padding="md">
                            <span className="bt-label" style={{ display: 'block', marginBottom: 'var(--bt-space-3)' }}>
                                Monospace — Code / Data
                            </span>
                            <pre
                                className="bt-mono"
                                style={{
                                    color: 'var(--bt-color-text-secondary)',
                                    lineHeight: 1.7,
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {`{
  "donor":    "@atharva_sharma",
  "blood":    "O+",
  "verified": true,
  "nft_id":   "hive-nft-00847",
  "tx_hash":  "3a7f2c...e91b"
}`}
                            </pre>
                        </BoldCard>

                        <div style={{ display: 'flex', gap: 'var(--bt-space-8)', flexWrap: 'wrap' }}>
                            <div>
                                <span className="bt-label">Label / Eyebrow</span>
                                <p className="bt-body" style={{ marginTop: 'var(--bt-space-2)', fontSize: 'var(--bt-text-sm)' }}>
                                    Used above headings for contextual categorization.
                                </p>
                            </div>
                            <div>
                                <span className="bt-mono" style={{ color: 'var(--bt-color-blood-light)' }}>
                                    font-family: JetBrains Mono
                                </span>
                                <p className="bt-body" style={{ marginTop: 'var(--bt-space-2)', fontSize: 'var(--bt-text-sm)' }}>
                                    Monospace used for data, hashes, and code blocks.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollFadeIn>
            </section>

            <BoldDivider accent spacing="lg" />

            {/* ── Motion / Interaction Demo ───────────────────────── */}
            <section style={{ padding: 'var(--bt-space-16) var(--bt-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeading
                    eyebrow="Motion"
                    title="Scroll Fade-In"
                    subtitle="Every section animates into view using Framer Motion with a custom ease-out curve. Scroll down to see each element reveal."
                    preset="sans"
                    size="md"
                />

                <div style={{ marginTop: 'var(--bt-space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--bt-space-4)' }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <ScrollFadeIn key={i} delay={i * 0.08} y={40}>
                            <BoldCard padding="md">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className="bt-heading-sans" style={{ fontSize: 'var(--bt-text-sm)' }}>
                                            Animation #{i + 1}
                                        </span>
                                        <p className="bt-body" style={{ fontSize: 'var(--bt-text-sm)', marginTop: '4px' }}>
                                            This card faded up with a {(i * 80)}ms delay.
                                        </p>
                                    </div>
                                    <span className="bt-mono" style={{ color: 'var(--bt-color-text-muted)' }}>
                                        delay: {i * 80}ms
                                    </span>
                                </div>
                            </BoldCard>
                        </ScrollFadeIn>
                    ))}
                </div>
            </section>

            <BoldDivider spacing="lg" />

            {/* ── Footer ──────────────────────────────────────────── */}
            <footer
                style={{
                    padding: 'var(--bt-space-16) var(--bt-space-8)',
                    borderTop: '1px solid var(--bt-color-border-subtle)',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <ScrollFadeIn>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--bt-space-6)' }}>
                        <div>
                            <span className="bt-heading-display" style={{ fontSize: 'var(--bt-text-4xl)' }}>
                                Ready to adopt?
                            </span>
                            <p className="bt-body" style={{ marginTop: 'var(--bt-space-2)' }}>
                                Apply this design system to any LifeNFT page by wrapping it in{' '}
                                <code className="bt-mono" style={{ color: 'var(--bt-color-blood-light)' }}>
                                    .bold-typography-theme
                                </code>
                            </p>
                        </div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <BoldButton variant="secondary" icon={<ArrowRight size={14} />}>
                                Back to App
                            </BoldButton>
                        </Link>
                    </div>
                </ScrollFadeIn>
                <div style={{ marginTop: 'var(--bt-space-8)' }}>
                    <span className="bt-mono" style={{ color: 'var(--bt-color-text-muted)', fontSize: '11px' }}>
                        Bold Typography Design System · LifeNFT · {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default DesignPreview;
