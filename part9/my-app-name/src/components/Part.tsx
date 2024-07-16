import { CoursePart } from "../types";
interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  return (
    <div>
      <h3>
        {course.name} {course.exerciseCount}
      </h3>

      {course.kind !== "group" && <em>{course.description}</em>}
      {course.kind === "background" && <p>{course.backgroundMaterial}</p>}
      {course.kind === "special" && (
        <p>required skills: {course.requirements.join(", ")}</p>
      )}
      {course.kind === "group" && (
        <p>project exercises: {course.groupProjectCount}</p>
      )}
    </div>
  );
};

export default Part;
