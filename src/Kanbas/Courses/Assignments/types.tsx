// src/Kanbas/Courses/Assignments/types.ts
export interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    due: string;
    not_available_until: string;
    available_until?: string;
    course: string;
    assignment_group?: string;
    display_grade_as?: string;
    submission_type?: string;
    online_entry_option?: string[];
  }