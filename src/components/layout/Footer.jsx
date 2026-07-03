import { Link } from "react-router-dom"
import { NAV_LINKS } from "../../data/navigation"
import { SOCIAL_LINKS } from "../../data/brandStrategy"

export default function Footer() {
  return (
    <footer className="relative bg-asa-surface overflow-hidden">
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-primary/40 to-transparent" />

      {/* Subtle radial bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,154,62,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-headline text-2xl font-bold text-asa-primary tracking-tight">
              ASA
            </h3>
            <p className="label-mono mt-1 text-[9px] tracking-[0.2em]">
              Actor&apos;s Slot Academy
            </p>
            <p className="mt-4 text-sm leading-relaxed text-asa-muted">
              Where African Talent Comes Alive. A creative talent house training
              the next generation of African storytellers.
            </p>
            <p className="mt-4 text-xs text-asa-muted">
              A proud member of the{" "}
              <span className="font-medium text-asa-primary">
                Furaha Kreative Factory
              </span>{" "}
              ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-mono mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.path ?? link.name}>
                  <Link
                    to={link.path ?? "#"}
                    className="text-sm text-asa-muted transition-colors duration-150 hover:text-asa-text"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-mono mb-5">Contact</h4>
            <ul className="space-y-2.5 text-sm text-asa-muted">
              <li>Kampala, Uganda</li>
              <li>
                <a
                  href="tel:+256123456789"
                  className="transition-colors duration-150 hover:text-asa-text"
                >
                  +256 123 456 789
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@actorsslotacademy.com"
                  className="transition-colors duration-150 hover:text-asa-text"
                >
                  info@actorsslotacademy.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="label-mono mb-5">Follow Us</h4>
            <ul className="space-y-2.5 text-sm text-asa-muted">
              {[
                { name: "Instagram", url: SOCIAL_LINKS.instagram },
                { name: "Facebook", url: SOCIAL_LINKS.facebook },
                { name: "YouTube", url: SOCIAL_LINKS.youtube },
                { name: "TikTok", url: SOCIAL_LINKS.tiktok },
              ].map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-150 hover:text-asa-primary"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-asa-border pt-6 flex flex-col items-center gap-4 text-center text-xs text-asa-muted sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <p>&copy; {new Date().getFullYear()} Actor&apos;s Slot Academy. All rights reserved.</p>
            <p className="text-[10px] text-asa-muted/50">
              &lt; Designed by <span className="hover:text-asa-primary transition-colors cursor-default">Charles Aroma</span> &gt;
            </p>
          </div>
          <p className="flex items-center gap-3">
            <span className="label-mono text-[9px] text-asa-primary/60">Kampala · Uganda</span>
            <span className="label-mono text-[9px] text-asa-muted/40">·</span>
            <Link to="/privacy" className="label-mono text-[9px] text-asa-muted/60 hover:text-asa-text transition-colors">
              Privacy Policy
            </Link>
            <span className="label-mono text-[9px] text-asa-muted/40">·</span>
            <Link to="/dashboard/auth/login" className="ml-4 rounded-md border border-asa-border bg-asa-background px-3 py-1.5 font-headline text-[10px] font-bold text-asa-primary tracking-widest hover:border-asa-primary hover:bg-asa-primary/10 transition-colors uppercase">
              Admin Access
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
