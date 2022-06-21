import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonCategory = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-category">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonCategory;
