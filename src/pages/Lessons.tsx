import Header from "@/components/Header";
import LessonsPath from "@/components/LessonsPath";
import { useEffect, useRef, useState } from "react";
import { lessonsData } from "@/mocks/lessonsData";
import Separator from "@/components/Separator";
import Footer from "@/components/Footer";

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
              className={`rounded-xl text-default border-b-5  shadow-lg ${header.color}`}
            >
              <div className="px-6 py-6 gap-2">
                <p className="uppercase text-xs tracking-widest opacity-90">
                  Começar unidade
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-wide">
                  Fundamentos de {header.text}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden">
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
