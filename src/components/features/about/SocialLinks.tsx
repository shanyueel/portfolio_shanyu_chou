import Link from "next/link"

interface SocialLinksProps {
  links: { id: string; href: string; icon: React.ReactNode; label?: string }[]
}

/** SocialLinks Component to display social media links with icons and labels (if provided) */
const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className="flex justify-center items-center gap-4 md:justify-start mt-2">
      {links.map(link => (
        <Link
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-gray-400 inline-flex items-center gap-2 no-underline"
        >
          <div className="transition-transform duration-200 group-hover:text-link group-hover:scale-125 text-2xl md:text-base">
            {link.icon}
          </div>
          {link.label && (
            <span className="group-hover:text-link group-hover:decoration-link">{link.label}</span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
