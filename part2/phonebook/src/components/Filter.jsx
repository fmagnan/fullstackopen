const Filter = ({ search, handler }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handler} />
    </div>
  );
};

export default Filter;
