import { CoursesService } from './courses.service';
import { CourseListItemDto, CourseDetailDto, CourseProgressDto, LevelDto, StartCourseResponseDto, GetCoursesQueryDto } from './dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(query: GetCoursesQueryDto): Promise<CourseListItemDto[]>;
    findBySlug(slug: string): Promise<CourseDetailDto>;
    getProgress(slug: string): Promise<CourseProgressDto>;
    getLevels(slug: string): Promise<LevelDto[]>;
    startCourse(slug: string): Promise<StartCourseResponseDto>;
    getCertificate(slug: string): Promise<{
        message: string;
        courseSlug: string;
    }>;
}
