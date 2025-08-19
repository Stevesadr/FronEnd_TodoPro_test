import { motion } from "framer-motion";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import StatCard from "../components/StatCard";
import Cookies from "js-cookie";
import HistoryDash from "@/components/HistoryDash";
import SettingsDash from "@/components/SettingsDash";
import AddTaskModal from "@/components/AddTaskModal";

export async function getServerSideProps(context) {
  // دریافت توکن از کوکی‌ها
  const token = context.req.cookies.token || null;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch("https://todopro-uhvq.onrender.com/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch todos");

    const todos = await res.json();
    return { props: { initialTodos: todos || [] } };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { props: { initialTodos: [] } };
  }
}

export default function Dashboard({ initialTodos }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState(initialTodos);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          contentRef.current &&
          contentRef.current.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // تابع کمکی برای دریافت توکن
  const getToken = () => {
    return Cookies.get("token") || user?.token;
  };

  // دریافت تسک‌ها از بک‌اند
  const fetchTodos = async () => {
    try {
      const token = getToken();
      console.log(token);
      const res = await fetch("https://todopro-uhvq.onrender.com/todos/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      setTasks(await res.json());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // افزودن تسک جدید
  const addTask = async (title, task_date, task_hour, task_minute) => {
    try {
      const token = getToken();

      // 1. ابتدا تسک جدید را به صورت موقت به state اضافه می‌کنیم
      const tempTask = {
        todo_id: Date.now(), // یک ID موقت
        title,
        status: false,
        task_date: task_date || new Date().toISOString().split("T")[0],
        task_hour: task_hour || new Date().getHours(),
        task_minute: task_minute || new Date().getMinutes(),
      };
      setTasks((prev) => [...prev, tempTask]);

      // 2. ارسال درخواست به بک‌اند
      const res = await fetch("https://todopro-uhvq.onrender.com/todos/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          task_date: task_date || new Date().toISOString().split("T")[0],
          task_hour: task_hour || new Date().getHours(),
          task_minute: task_minute || new Date().getMinutes(),
        }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      // 3. دریافت پاسخ از بک‌اند
      const responseData = await res.json();

      // 4. جایگزینی لیست کامل با داده‌های جدید از سرور
      if (responseData.results && Array.isArray(responseData.results)) {
        setTasks(responseData.results);
      }
    } catch (err) {
      console.error("Error adding todo:", err);
      // در صورت خطا، تسک موقت را حذف می‌کنیم
      setTasks((prev) =>
        prev.filter((task) => task.todo_id !== tempTask.todo_id)
      );
      alert("Failed to add task");
    }
  };

  // تغییر وضعیت تسک
  const toggleTask = async (id) => {
    try {
      const token = getToken();
      const taskToUpdate = tasks.find((task) => task.todo_id === id);
      if (!taskToUpdate) return;

      const res = await fetch(`https://todopro-uhvq.onrender.com/todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: !taskToUpdate.status, // تغییر وضعیت به حالت معکوس
        }),
      });

      if (!res.ok) throw new Error("Failed to update todo");

      // دریافت پاسخ از سرور
      const responseData = await res.json();

      // بررسی ساختار پاسخ و به‌روزرسانی state
      if (responseData.results && Array.isArray(responseData.results)) {
        setTasks(responseData.results); // به‌روزرسانی تمام تسک‌ها با داده‌های جدید
      } else {
        // اگر ساختار پاسخ متفاوت بود، فقط همان تسک را آپدیت می‌کنیم
        const updatedTask = await res.json();
        setTasks(
          tasks.map((task) => (task.todo_id === id ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error("Error:", error);
      // نمایش پیام خطا به کاربر (اختیاری)
      alert("Failed to update task. Please try again.");
    }
  };
  const deleteTask = async (id) => {
    try {
      const token = getToken();
      const res = await fetch(`https://todopro-uhvq.onrender.com/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      // حذف تسک از لیست
      setTasks(tasks.filter((task) => task.todo_id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  useEffect(() => {
    if (getToken()) fetchTodos();

    // بررسی اندازه صفحه برای نمایش سایدبار
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | TodoPro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTask}
      />

      <div className="flex flex-col md:flex-row h-screen bg-gray-50 relative">
        {/* دکمه همبرگر برای موبایل */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {/* سایدبار */}
        <motion.aside
          ref={sidebarRef}
          initial={{ x: -100 }}
          animate={{
            x: isSidebarOpen ? 0 : -300,
            width: isSidebarOpen ? "16rem" : "0",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed md:relative z-40 h-full bg-white shadow-sm border-r border-gray-200 flex flex-col`}
          style={{ width: isSidebarOpen ? "16rem" : "0" }}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">TodoPro</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiHome className="text-lg" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("tasks")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                activeTab === "tasks"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiCalendar className="text-lg" />
              <span>My Tasks</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiSettings className="text-lg" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <FiLogOut className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>
        </motion.aside>

        {/* محتوای اصلی */}
        <div
          ref={contentRef}
          className="flex-1 flex flex-col overflow-hidden md:ml-0 transition-all duration-300"
        >
          {/* هدر */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-4 md:px-6 py-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {activeTab === "dashboard" && "My Dashboard"}
                {activeTab === "tasks" && "My Tasks"}
                {activeTab === "settings" && "Settings"}
              </h2>
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-sm md:text-base">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm md:text-base">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            </div>
          </header>

          {/* محتوای صفحه */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {/* آمار سریع - فقط در تب دشبورد نمایش داده می‌شود */}
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <StatCard
                  title="Total Tasks"
                  value={tasks.length}
                  icon="📝"
                  color="bg-blue-100 text-blue-600"
                />
                <StatCard
                  title="Completed"
                  value={tasks.filter((t) => t.status).length}
                  icon="✅"
                  color="bg-green-100 text-green-600"
                />
                <StatCard
                  title="Pending"
                  value={tasks.filter((t) => !t.status).length}
                  icon="⏳"
                  color="bg-amber-100 text-amber-600"
                />
              </div>
            )}

            {/* محتوای داینامیک بر اساس تب فعال */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {activeTab === "dashboard" && <HistoryDash />}

              {activeTab === "tasks" && (
                <>
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                        <h3 className="text-base md:text-lg font-semibold">
                          Today's Tasks
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm"
                          onClick={() => setIsAddModalOpen(true)} // باز کردن مودال
                        >
                          <FiPlus size={14} />
                          <span>Add Task</span>
                        </motion.button>
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        {tasks.map((task) => (
                          <motion.div
                            key={task.todo_id}
                            whileHover={{ y: -2 }}
                            className={`flex items-center p-2 md:p-3 rounded-lg border cursor-pointer transition-all ${
                              task.status
                                ? "bg-green-50 border-green-200"
                                : "bg-white border-gray-200 hover:shadow-sm"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 md:w-5 md:h-5 rounded border flex items-center justify-center mr-2 md:mr-3 ${
                                task.status
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-gray-300"
                              }`}
                              onClick={() => toggleTask(task.todo_id)}
                            >
                              {task.status && "✓"}
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-col">
                                <span
                                  className={`text-sm md:text-base ${
                                    task.status
                                      ? "line-through text-gray-500"
                                      : "text-gray-800 font-medium"
                                  }`}
                                  onClick={() => toggleTask(task.todo_id)}
                                >
                                  {task.title}
                                </span>

                                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    {task.task_date}
                                  </span>

                                  <span className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {task.task_hour
                                      ?.toString()
                                      .padStart(2, "0")}
                                    :
                                    {task.task_minute
                                      ?.toString()
                                      .padStart(2, "0")}
                                  </span>

                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs ${
                                      task.status
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {task.status ? "Completed" : "Pending"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.todo_id);
                              }}
                              className="text-red-500 hover:text-red-700 ml-2 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete task"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-5 md:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                      Calendar
                    </h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs md:text-sm">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="font-medium text-gray-500 py-1"
                          >
                            {day.charAt(0)}
                          </div>
                        )
                      )}
                      {Array.from({ length: 31 }).map((_, i) => (
                        <div
                          key={`day-${i}`}
                          className={`p-1 md:p-2 rounded-full ${
                            i + 1 === new Date().getDate()
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "settings" && (
                <SettingsDash
                  user={user?.username || "Not available"}
                  email={user?.email || "Not available"}
                />
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
