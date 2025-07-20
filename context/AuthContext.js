// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { GET } from "@/pages/api/getWithToken";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // بررسی توکن هنگام لود اولیه
    const token = Cookies.get("token");

    if (token) {
      // در اینجا می‌توانید اطلاعات کاربر را از API دریافت کنید
      const fetchUser = async () => {
        try {
          // مثال: فراخوانی API برای دریافت اطلاعات کاربر
          const response = await GET("auth/user");
          const userData = await response.json();

          // برای مثال از داده‌های ساختگی استفاده می‌کنیم

          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (token, userData) => {
    // ذخیره توکن در کوکی با تنظیمات امنیتی
    Cookies.set("token", token, {
      expires: 7, // 7 روز
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    // حذف توکن از کوکی
    Cookies.remove("token", { path: "/" });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
