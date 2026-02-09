import { notFound } from "next/navigation";
import { courses } from "@/lib/data/courses";
import { CourseDetailClient } from "./course-detail-client";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Since this is sync, we need to handle it carefully
  // In Next.js 16 with async params, we use a different pattern
  return {
    title: "Course | Aralify",
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
