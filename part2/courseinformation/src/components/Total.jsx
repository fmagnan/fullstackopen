const Total = ({ parts }) => {
  return (
    <>
        <strong>
          total of {parts.reduce((n, { exercises }) => n + exercises, 0)}{" "}
          exercises
        </strong>
    </>
  );
};

export default Total;
