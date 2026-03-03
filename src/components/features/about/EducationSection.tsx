import Tag from "@/components/ui/Tag"

interface EducationSectionProps {
  degree: string
  school: string
  duration: string
  location: string
  description: string
  tags?: string
}

/** EducationSection component to display single educational background. */
const EducationSection = ({
  degree,
  school,
  duration,
  location,
  description,
  tags = "",
}: EducationSectionProps) => {
  return (
    <div>
      <h3 className="mt-0 mb-1">
        {degree} @ {school}
      </h3>
      <h4 className="text-sm text-gray-600 dark:text-gray-400">
        {duration} | {location}
      </h4>
      <p className="mt-2 mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.split(",").map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </div>
  )
}

export default EducationSection
