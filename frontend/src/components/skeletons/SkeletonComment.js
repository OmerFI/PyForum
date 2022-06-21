import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonComment = () => {
  return (
    <div className="skeleton-wrapper mt-0 mb-2">
      <div className="skeleton-comment d-flex flex-column">
        <div className="d-flex">
          <SkeletonElement type="avatar" />
          <div className="flex-grow-1 ps-3 justify-content-center h-100">
            <SkeletonElement type="username" />
            <SkeletonElement type="date" />
          </div>
        </div>
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonComment;
