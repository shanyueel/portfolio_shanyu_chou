import Card from "@/components/mdx/Card"

interface ValueCardProps {
  title: string
  icon: React.ReactNode
  description: string
}

/** ValueCard Component to display personal sense of value with an icon, title, and description */
const ValueCard = ({ title, icon, description }: ValueCardProps) => {
  return (
    <Card className="flex flex-col items-center text-center [&_h3]:mt-2 [&_p]:text-sm [&_p]:text-left">
      <div className="flex justify-center text-4xl pt-2">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}

export default ValueCard
