import PropTypes from "prop-types";
import { Skeleton } from "./ui/skeleton";

type QuizSkeletonProps = {
  className?: string;
};

const QuizSkeleton = ({ className }: QuizSkeletonProps) => {
  return <Skeleton className={className} />;
};

QuizSkeleton.propTypes = {
  className: PropTypes.string,
};

export default QuizSkeleton;
