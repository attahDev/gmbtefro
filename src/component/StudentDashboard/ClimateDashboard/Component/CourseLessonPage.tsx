import { Navigate, useParams } from "react-router-dom";

import { CourseSidebar } from "../Component/CourseSidebar";
import { LessonContent } from "../Component/LessonContent";
import { LessonNavigation } from "../Component/LessonNavigation";
import { getSustainabilityLesson } from "../data/sustainabilityCourses";

export default function CourseLessonPage() {
  const { courseSlug, lessonSlug } = useParams<{
    courseSlug: string;
    lessonSlug: string;
  }>();

  if (!courseSlug || !lessonSlug) {
    return <Navigate to="/sustainability" replace />;
  }

  const result = getSustainabilityLesson(courseSlug, lessonSlug);

  if (!result) {
    return <Navigate to="/sustainability" replace />;
  }

  const { course, lesson } = result;

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar
          course={course}
          activeLessonSlug={lesson.slug}
        />

        <div className="min-w-0 flex-1">
          <LessonContent course={course} lesson={lesson} />

          <LessonNavigation
            course={course}
            lessonSlug={lesson.slug}
          />
        </div>
      </div>
    </main>
  );
}