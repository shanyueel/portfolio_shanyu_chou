import Link from "next/link"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

/**
 * Footer component that serves as the bottom info block for the portfolio.
 */
const Footer = () => {
  return (
    <footer
      id="footerPortfolio"
      className="mt-4 px-4 py-6 border-t border-gray-300 text-center text-sm text-gray-500
        bg-light dark:border-gray-800 dark:bg-dark"
    >
      <div className="flex justify-center gap-6 mb-2 text-xl">
        <Link
          href="https://github.com/shanyueel"
          aria-label="GitHub"
          className="transition-transform duration-200 hover:text-link hover:scale-125"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/shanyu-chou/"
          aria-label="LinkedIn"
          className="transition-transform duration-200 hover:text-link hover:scale-125"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="mailto:wulingkevin0704@gmail.com"
          target="_blank"
          aria-label="Email"
          className="transition-transform duration-200 hover:text-link hover:scale-125"
        >
          <FaEnvelope />
        </Link>
      </div>

      {/* Copyright section */}
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} Shan-Yu Chou. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
