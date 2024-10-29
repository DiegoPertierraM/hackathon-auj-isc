import './skeleton.scss';
export const Skleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__header"></div>
      <div className="skeleton__content">
        <div className="skeleton__row"></div>
        <div className="skeleton__row"></div>
        <div className="skeleton__row"></div>
        <div className="skeleton__row"></div>
        <div className="skeleton__row"></div>
      </div>
    </div>
  );
};
