import Header from "@/components/Header";
import LessonsPath from "@/components/LessonsPath";
import { useEffect, useRef, useState } from "react";
import { lessonsData } from "@/mocks/lessonsData";
import Separator from "@/components/Separator";
import Footer from "@/components/Footer";
import { LuNotebookText } from "react-icons/lu";

export const Lessons = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [header, setHeader] = useState({
    text: "",
    color: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { text, color } = (entry.target as HTMLElement).dataset;
            if (text && color) {
              setHeader({ text, color });
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <div className="sticky top-0 z-30 bg-default">
        <Header />
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-4">
            <div
              className={`flex justify-between items-center w-full rounded-xl text-default border-b-5 shadow-lg ${header.color}`}
            >
              <div className="pl-4 py-4 sm:pl-6 sm:px-6 sm:py-6 gap-2">
                <p className="uppercase text-xs tracking-widest opacity-90">
                  Começar unidade
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-wide">
                  Fundamentos de {header.text}
                </h2>
              </div>
              <div className="pr-4 py-4 sm:pr-6 sm:px-6 sm:py-6 gap-2">
                <div
                  className={`border-2 border-b-4 p-2 rounded-lg ${header.color}`}
                >
                  <LuNotebookText className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden bg-default">
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          data-text={lessonsData[0].title}
          data-color="bg-primary border-primary-dark"
        >
          <LessonsPath module="html" />
        </section>

        <Separator module="CSS" />

        <section
          id="css"
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          data-text={lessonsData[1].title}
          data-color="bg-secondary border-secondary-dark"
        >
          <LessonsPath module="css" />
        </section>

        <Separator module="Javascript" />

        <section
          id="js"
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          data-text={lessonsData[2].title}
          data-color="bg-variant border-variant-dark"
        >
          <LessonsPath module="js" />
        </section>
      </div>
      <div className="sticky bottom-0 z-30 bg-default sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Lessons;
