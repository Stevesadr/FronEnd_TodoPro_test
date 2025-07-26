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
import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import Cookies from "js-cookie";

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
    const res = await fetch("http://127.0.0.1:5000/todos", {
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
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState(initialTodos);

  // تابع کمکی برای دریافت توکن
  const getToken = () => {
    return Cookies.get("token") || user?.token;
  };

  // دریافت تسک‌ها از بک‌اند
  const fetchTodos = async () => {
    try {
      const token = getToken();
      console.log(token);
      const res = await fetch("http://127.0.0.1:5000/todos/", {
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
  const addTask = async (title) => {
    try {
      const token = getToken();

      // 1. ابتدا تسک جدید را به صورت موقت به state اضافه می‌کنیم
      const tempTask = {
        todo_id: Date.now(), // یک ID موقت
        title,
        status: false,
        task_date: new Date().toISOString().split("T")[0], // تاریخ امروز
      };
      setTasks((prev) => [...prev, tempTask]);

      // 2. ارسال درخواست به بک‌اند
      const res = await fetch("http://127.0.0.1:5000/todos/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
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

      const res = await fetch(`http://127.0.0.1:5000/todos/${id}`, {
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

  useEffect(() => {
    if (getToken()) fetchTodos();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | TodoPro</title>
      </Head>

      <div className="flex h-screen bg-gray-50">
        {/* سایدبار */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col"
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">TodoPro</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
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
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* هدر */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                My Dashboard
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{user?.username || "User"}</p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            </div>
          </header>

          {/* محتوای صفحه */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* آمار سریع */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

            {/* لیست تسک‌ها و تقویم */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Today's Tasks</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                      onClick={() => {
                        const newTask = prompt("Enter new task:");
                        if (newTask) addTask(newTask);
                      }}
                    >
                      <FiPlus />
                      <span>Add Task</span>
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.todo_id} // تغییر از id به todo_id
                        whileHover={{ y: -2 }}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          task.status // تغییر از completed به status
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200 hover:shadow-sm"
                        }`}
                        onClick={() => toggleTask(task.todo_id)}
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                            task.status // تغییر از completed به status
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {task.status && "✓"}
                        </div>
                        <span
                          className={`flex-1 ${
                            task.status // تغییر از completed به status
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {task.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* تقویم */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div
                      key={day}
                      className="text-xs font-medium text-gray-500 py-1"
                    >
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-full text-sm ${
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
