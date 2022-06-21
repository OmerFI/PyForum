import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonPostPreview = () => {
  return (
    <div className="skeleton-wrapper mt-0">
      <div className="skeleton-post-preview">
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonPostPreview;
