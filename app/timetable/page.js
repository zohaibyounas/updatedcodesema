"use client";

import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../context/UserContex";
import Link from "next/link"; // Import Link for navigation to register page

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TimeTable() {
  const { isAdmin, user } = useUser(); // Get isAdmin and user from context
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [courses, setCourses] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newCourse, setNewCourse] = useState({ name: "", time: "" });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null); // For editing course
  const [isDeleting, setIsDeleting] = useState(false); // New state to track deletion
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch courses from the database
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("Courses").select("*");
      if (error) {
        toast.error("Error fetching courses!", {
          position: "top-center",
        });
        return;
      }
      // Organize courses by date
      const coursesByDate = {};
      data.forEach((course) => {
        const date = course.course_schedule;
        if (!coursesByDate[date]) {
          coursesByDate[date] = [];
        }
        coursesByDate[date].push(course);
      });
      setCourses(coursesByDate);
    };

    fetchCourses();
  }, []);

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const days = [];
  let day = startOfMonth.startOf("week");

  for (let i = 0; i < 35; i++) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleAddCourse = async (day) => {
    if (!newCourse.name || !newCourse.time) {
      toast.error("Please select a course name and time!", {
        position: "top-center",
      });
      return;
    }

    const postdata = {
      course_title: newCourse.name,
      course_duration: newCourse.time,
      course_schedule: day.format("YYYY-MM-DD"),
    };

    const { data, error } = await supabase
      .from("Courses")
      .insert([postdata])
      .select();
    if (error) {
      toast.error("Error adding course to the database!", {
        position: "top-center",
      });
      return;
    }

    setCourses({
      ...courses,
      [day.format("YYYY-MM-DD")]: [
        ...(courses[day.format("YYYY-MM-DD")] || []),
        postdata,
      ],
    });

    setNewCourse({ name: "", time: "" });
    setSelectedDay(null);
    toast.success("Course added successfully!", {
      position: "top-center",
    });
  };

  const handleEditCourse = async (course) => {
    setEditingCourse(course); // Set the course to be edited
    setNewCourse({ name: course.course_title, time: course.course_duration });
    setSelectedDay(dayjs(course.course_schedule));
  };

  const handleSaveEditedCourse = async () => {
    const { error } = await supabase
      .from("Courses")
      .update({
        course_title: newCourse.name,
        course_duration: newCourse.time,
      })
      .eq("id", editingCourse.id);

    if (error) {
      toast.error("Error updating the course!", {
        position: "top-center",
      });
      return;
    }

    const updatedCourses = { ...courses };
    updatedCourses[selectedDay.format("YYYY-MM-DD")] = updatedCourses[
      selectedDay.format("YYYY-MM-DD")
    ].map((course) =>
      course.id === editingCourse.id
        ? {
            ...course,
            course_title: newCourse.name,
            course_duration: newCourse.time,
          }
        : course
    );

    setCourses(updatedCourses);
    setNewCourse({ name: "", time: "" });
    setSelectedDay(null);
    setEditingCourse(null);
    toast.success("Course updated successfully!", {
      position: "top-center",
    });
  };

  const handleDeleteCourse = async (course) => {
    // Set the deleting state to true
    setIsDeleting(true);

    const { error } = await supabase
      .from("Courses")
      .delete()
      .eq("id", course.id);

    if (error) {
      toast.error("Error deleting the course!", {
        position: "top-center",
      });
      return;
    }

    const updatedCourses = { ...courses };
    updatedCourses[dayjs(course.course_schedule).format("YYYY-MM-DD")] =
      updatedCourses[dayjs(course.course_schedule).format("YYYY-MM-DD")].filter(
        (c) => c.id !== course.id
      );

    setCourses(updatedCourses);
    setNewCourse({ name: "", time: "" });
    setSelectedDay(null);
    setEditingCourse(null);

    // Reset the deleting state
    setIsDeleting(false);

    // Show success toast message
    toast.success("Course deleted successfully!", {
      position: "top-center",
      autoClose: 10,
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedDay(null);
        setSelectedCourse(null);
        setEditingCourse(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCancel = () => {
    setSelectedDay(null);
    setEditingCourse(null);
  };

  return (
    <div className="py-12" id="Kalender">
      <div className="relative mx-auto flex flex-col items-center justify-center w-11/12 sm:w-4/5 overflow-x-auto text-center min-h-[75vh]">
        <h3 className="mb-6 text-2xl text-black">Wochenplan</h3>

        <div className="mb-6 flex items-center justify-center gap-4 text-black">
          <button
            onClick={goToPreviousMonth}
            className="bg-stone-300 px-3 py-2 text-2xl"
          >
            &lt;
          </button>
          <span className="text-2xl">{currentMonth.format("MMMM YYYY")}</span>
          <button
            onClick={goToNextMonth}
            className="bg-stone-300 px-3 py-2 text-2xl"
          >
            &gt;
          </button>
        </div>

        <div
          className={`w-full overflow-x-auto ${
            selectedDay && !isDeleting ? "blur-sm" : ""
          }`}
        >
          <table className="w-full border-collapse text-xs sm:text-sm md:text-lg">
            <thead className="bg-stone-300 text-black">
              <tr>
                <th className="whitespace-nowrap p-3">Uhrzeit</th>
                {[
                  "Montag",
                  "Dienstag",
                  "Mittwoch",
                  "Donnerstag",
                  "Freitag",
                  "Samstag",
                  "Sonntag",
                ].map((day) => (
                  <th key={day} className="whitespace-nowrap p-3 ">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <th className="whitespace-nowrap border border-gray-300 bg-stone-300 p-4 text-black  ">
                    <span className="block px-2 py-1">{`${
                      9 + rowIndex
                    }:00`}</span>
                    <span className="block px-2 py-1 ">-</span>
                    <span className="block px-2 py-1">{`${
                      10 + rowIndex
                    }:00`}</span>
                  </th>
                  {days
                    .slice(rowIndex * 7, (rowIndex + 1) * 7)
                    .map((day, colIndex) => (
                      <td
                        key={colIndex}
                        className="relative border border-gray-300 p-4 cursor-pointer"
                        onClick={() => {
                          if (isAdmin && !isDeleting) {
                            setSelectedDay(day);
                            setSelectedCourse(null);
                          }
                        }}
                      >
                        <span className="absolute top-0 right-0 m-1 text-black text-xl">
                          {day.date()}
                        </span>

                        <div className="flex flex-col justify-between h-full">
                          {(courses[day.format("YYYY-MM-DD")] || []).map(
                            (course, i) => (
                              <div
                                key={i}
                                className="text-black cursor-pointer flex flex-col h-full justify-between w-64 ml-24"
                              >
                                <div className="text-3xl ">
                                  {course.course_title}
                                </div>

                                <div className="text-2xl mb-4">
                                  {course.course_duration}
                                </div>

                                {/* Remove Sign Up Button and Add Register Button */}
                                {!isAdmin && (
                                  <Link href="/register">
                                    <button className="mt-auto bg-teal-500 text-white px-2 py-1 rounded">
                                      Register
                                    </button>
                                  </Link>
                                )}
                              </div>
                            )
                          )}

                          {/* Show Edit/Delete only for Admin */}
                          {isAdmin &&
                            courses[day.format("YYYY-MM-DD")]?.length > 0 && (
                              <div className="flex gap-4 justify-center mt-2 ">
                                <button
                                  onClick={() =>
                                    handleEditCourse(
                                      courses[day.format("YYYY-MM-DD")][0]
                                    )
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCourse(
                                      courses[day.format("YYYY-MM-DD")][0]
                                    )
                                  }
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedDay && !isDeleting && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            ref={modalRef}
          >
            <div className="bg-white lg:w-[30%] w-[90%] lg:h-[40%] h-[40%] font-bold p-6 rounded shadow-lg mb-32">
              <h4 className="mb-8 text-4xl mt-8">
                {editingCourse
                  ? `Edit Course for ${selectedDay.format("MMMM DD, YYYY")}`
                  : `Add Course for ${selectedDay.format("MMMM DD, YYYY")}`}
              </h4>
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="block w-full p-6 border border-gray-300 rounded mb-4 placeholder:text-2xl text-xl  "
              />
              <input
                type="time"
                value={newCourse.time}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, time: e.target.value })
                }
                className="block w-full p-6 border border-gray-300 rounded mb-4 placeholder:text-xl text-2xl "
              />
              <div className="flex gap-3 justify-center mt-16">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-8 py-4 rounded-lg text-xl"
                >
                  Cancel
                </button>
                {editingCourse ? (
                  <button
                    onClick={handleSaveEditedCourse}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl font-bold"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddCourse(selectedDay)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl font-bold"
                  >
                    Add Course
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
