import Header from "@/components/Header";
import LessonsPath from "@/components/LessonsPath";
import { useParams } from "react-router";

export const Lessons = () => {
  const params = useParams();

  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <div className="sticky top-0 z-30 bg-transparent">
        <Header />
      </div>
      <div className="overflow-x-hidden">
        <LessonsPath module={params.id!} />
      </div>
    </div>
  );
};

export default Lessons;
