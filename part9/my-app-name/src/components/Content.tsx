import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}
const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part course={course} key={course.name} />
      ))}
    </div>
  );
};

export default Content;
