import Card from "@/components/mdx/Card"
import { FaShapes, FaUsers, FaSearch } from "react-icons/fa"
import { ReactNode } from "react"

const iconMap: Record<string, ReactNode> = {
  FaShapes: <FaShapes />,
  FaUsers: <FaUsers />,
  FaSearch: <FaSearch />,
}

interface ValueCardProps {
  title: string
  /** Icon name string (e.g. "FaShapes") — use this in MDX instead of JSX expression */
  iconName?: string
  /** Direct icon node — use this in TSX */
  icon?: ReactNode
  description: string
}

/** ValueCard Component to display personal sense of value with an icon, title, and description */
const ValueCard = ({ title, iconName, icon, description }: ValueCardProps) => {
  const resolvedIcon = iconName ? iconMap[iconName] : icon

  return (
    <Card className="flex flex-col items-center text-center [&_h3]:mt-2 [&_p]:text-sm [&_p]:text-left">
      <div className="flex justify-center text-4xl pt-2">{resolvedIcon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}

export default ValueCard
