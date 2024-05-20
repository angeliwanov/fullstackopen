const Course = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <section>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => (
          <li key={part.name}>
            <p>
              {part.name} {part.exercises}
            </p>
          </li>
        ))}
      </ul>
      <p id="total">total of {total} execises</p>
    </section>
  );
};

export default Course;
