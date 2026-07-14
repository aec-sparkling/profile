import { useState } from 'react';
import { courses } from '../data';
import type { Course } from '../types';

function CourseItem({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const expandable = !!course.items?.length;

  return (
    <li
      className={`xp ${open ? 'open' : ''} ${expandable ? '' : 'static'}`}
      onClick={() => expandable && setOpen((o) => !o)}
    >
      <div className="xp-head">
        <span className="xp-toggle">{expandable ? (open ? '▾' : '▸') : '·'}</span>
        <span className="xp-role">{course.title}</span>
        <span className="xp-period">{course.year}</span>
      </div>
      <p className="course-provider">// {course.provider}</p>
      {open && course.items && (
        <ul className="course-items">
          {course.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CoursesPanel() {
  return (
    <>
      <ul className="xp-list">
        {courses.map((c) => (
          <CourseItem key={c.title} course={c} />
        ))}
      </ul>
      <p className="hint">// click a specialization to list its courses</p>
    </>
  );
}
