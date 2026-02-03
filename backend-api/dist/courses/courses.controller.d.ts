import { User } from '@prisma/client';
import { CoursesService } from './courses.service';
import { CourseListItemDto, CourseDetailDto, CourseProgressDto, LevelDto, StartCourseResponseDto, GetCoursesQueryDto } from './dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(query: GetCoursesQueryDto): Promise<CourseListItemDto[]>;
    findBySlug(slug: string): Promise<CourseDetailDto>;
    getProgress(slug: string, user: User): Promise<CourseProgressDto>;
    getLevels(slug: string): Promise<LevelDto[]>;
    startCourse(slug: string, user: User): Promise<StartCourseResponseDto>;
    getCertificate(slug: string, user: User): Promise<{
        message: string;
        courseSlug: string;
        userId: string;
    }>;
}
