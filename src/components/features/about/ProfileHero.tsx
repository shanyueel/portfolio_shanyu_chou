import { cn } from "@/lib/utils"
import Image from "next/image"
import { ReactNode } from "react"

interface ProfileHeroProps {
  children: ReactNode
  imageSrc: string
  imageAlt: string
}

/** ProfileHero component to display a profile image alongside introduction. */
const ProfileHero = ({ children, imageSrc, imageAlt }: ProfileHeroProps) => {
  return (
    <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
      <div
        className={cn(
          "flex-1 p-4",
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          "[&_h2]:mb-0 [&_h2]:text-center [&_h2]:md:text-left",
          "[&_p]:mt-4"
        )}
      >
        {children}
      </div>
      <div className="w-50">
        <Image
          className="rounded-2xl object-cover mt-0 mb-0"
          width={360}
          height={640}
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
  )
}

export default ProfileHero
