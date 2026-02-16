import { notFound } from "next/navigation";
import { courses } from "@/lib/data/courses";
import { CourseDetailClient } from "./course-detail-client";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return {
    title: "Course | Aralify",
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Use mock data as static fallback; CourseDetailClient will
  // attempt to fetch fresh data from the API on the client side
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
