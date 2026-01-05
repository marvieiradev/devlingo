import Header from "@/components/Header";
import LessonsPath from "@/components/LessonsPath";
import { useParams } from "react-router";

export const Lessons = () => {
  const params = useParams();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <LessonsPath module={params.id!} />
    </div>
  );
};

export default Lessons;
