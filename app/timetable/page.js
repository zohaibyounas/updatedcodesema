"use client";

import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../context/UserContex";

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

  // Function to handle user course sign-up
  const handleSignUpForCourse = async (course) => {
    if (!user || !user.id) {
      toast.error("You need to be logged in to sign up for a course!", {
        position: "top-center",
      });
      return;
    }

    const { error } = await supabase
      .from("CourseSignups") // Ensure this is the correct table where signups are stored
      .insert([{ Users_id: user.id, course_id: course.id }]); // Adjust to your actual column names

    if (error) {
      toast.error("Error signing up for the course!", {
        position: "top-center",
      });
      return;
    }

    toast.success("Successfully signed up for the course!", {
      position: "top-center",
    });
  };

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedDay(null);
        setSelectedCourse(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedDay(null);
  };

  // Cancel the add course modal
  const handleCancel = () => {
    setSelectedDay(null); // Close the modal by resetting selectedDay
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
          className={`w-full overflow-x-auto ${selectedDay ? "blur-sm" : ""}`}
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
                  <th className="whitespace-nowrap border border-gray-300 bg-stone-300 p-4 text-black ">
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
                          if (isAdmin) {
                            setSelectedDay(day);
                            setSelectedCourse(null);
                          }
                        }}
                      >
                        <span className="absolute top-0 right-0 m-1 text-black text-xl">
                          {day.date()}
                        </span>

                        {/* Flex container for course content */}
                        <div className="flex flex-col justify-between h-full">
                          {/* Display added courses */}
                          {(courses[day.format("YYYY-MM-DD")] || []).map(
                            (course, i) => (
                              <div
                                key={i}
                                className="text-black cursor-pointer flex flex-col h-full justify-between w-64"
                              >
                                {/* Course title */}
                                <div className="text-3xl">
                                  {course.course_title}
                                </div>

                                {/* Course duration */}
                                <div className="text-2xl mb-4">
                                  {course.course_duration}
                                </div>

                                {/* Sign-up button positioned below the time */}
                                {!isAdmin && (
                                  <button
                                    onClick={() =>
                                      handleSignUpForCourse(course)
                                    }
                                    className="mt-auto bg-blue-500 text-white px-2 py-1 rounded"
                                  >
                                    Sign Up
                                  </button>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedDay && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            ref={modalRef}
          >
            <div className="bg-white w-[30%] h-[25%] font-bold p-6 rounded shadow-lg mb-32">
              <h4 className="mb-8 text-4xl mt-8">
                Add Course for {selectedDay.format("MMMM DD, YYYY")}
              </h4>
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="block w-full p-6 border border-gray-300 rounded mb-4 placeholder:text-xl text-2xl "
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
                <button
                  onClick={() => handleAddCourse(selectedDay)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl font-bold"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}