import Link from 'next/link'
import {FaGithub, FaLinkedin, FaGoodreads, FaEnvelope, FaInstagram, FaReddit} from 'react-icons/fa'
import {FaXTwitter} from "react-icons/fa6";
import {appVersion} from "@/lib/constants";

export default function Footer() {

    return (
        <footer
            className="mt-4 py-6 text-center text-sm text-gray-500 px-4 border-t
            dark:border-gray-800 border-gray-300 dark:bg-black"
            id="footerPortfolio"
        >
            <div className="flex justify-center gap-6 mb-2 text-xl">
                <Link
                    href="https://github.com/shanyueel"
                    aria-label="GitHub"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaGithub/>
                </Link>
                <Link
                    href="https://www.linkedin.com/in/shanyu-chou/"
                    aria-label="LinkedIn"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaLinkedin/>
                </Link>
                <Link
                    href="mailto:wulingkevin0704@gmail.com"
                    target="_blank"
                    aria-label="Email"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaEnvelope/>
                </Link>
            </div>

            {/* Copyright section */}
            <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Shan-Yu Chou. All rights reserved.</p>
        </footer>
    )
}
