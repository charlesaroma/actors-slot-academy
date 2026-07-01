import { Link } from "react-router-dom"
import { NAV_LINKS } from "../../data/navigation"

export default function Footer() {
  return (
    <footer className="bg-asa-black text-asa-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-headline text-xl font-bold tracking-tight">
              Actor&apos;s Slot Academy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-asa-grey">
              Where African Talent Comes Alive. A creative talent house
              training the next generation of African storytellers.
            </p>
            <p className="mt-4 text-xs text-asa-grey">
              A proud member of the{" "}
              <span className="font-medium text-asa-bronze">
                Furaha Kreative Factory
              </span>{" "}
              ecosystem.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-asa-grey transition-colors hover:text-asa-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-asa-grey">
              <li>Kampala, Uganda</li>
              <li>
                <a
                  href="tel:+260123456789"
                  className="transition-colors hover:text-asa-ivory"
                >
                  +256 123 456 789
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@actorsslotacademy.com"
                  className="transition-colors hover:text-asa-ivory"
                >
                  info@actorsslotacademy.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest">
              Follow Us
            </h4>
            <ul className="space-y-2 text-sm text-asa-grey">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-asa-ivory"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-asa-ivory"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-asa-ivory"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-asa-ivory"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-asa-ivory/10 pt-6 text-center text-xs text-asa-grey">
          &copy; {new Date().getFullYear()} Actor&apos;s Slot Academy. All
          rights reserved.
        </div>
      </div>
    </footer>
  )
}
