import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, LogOut, User, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiMenuAlt2 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useBasicLogin, useLogout, useRegister } from "@/hooks/useApi";
import { setAuthToken } from "@/lib/api";
import { FaSpinner } from "react-icons/fa";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useAtom } from "jotai";
import { isLoggedInAtom, loginModalAtom } from "@/lib/atoms";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "Day Tours", href: "/day-tour" },
  { name: "Partners", href: "/partners" },
  { name: "About Us", href: "/about" },
  { name: "Blogs", href: "/blogs" },
];

// NavItem component with animated underline
interface NavItemProps {
  item: { name: string; href: string };
  isActive: boolean;
  index: number;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  index,
  onClick,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.05 + 0.15,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <Link
          href={item.href}
          onClick={onClick}
          className={cn(
            "flex items-center px-6 py-4 text-lg font-medium transition-all duration-300 relative group",
            isActive
              ? "text-[#872BFF] bg-linear-to-r from-purple-50 to-transparent font-semibold"
              : "text-gray-700 hover:text-[#872BFF] hover:bg-linear-to-r hover:from-gray-50 hover:to-transparent"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-1 bg-[#872BFF] rounded-r-full",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
            animate={{
              width: isActive ? 4 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10 ml-3">{item.name}</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className={cn(
          "relative px-1 py-2 text-sm lg:text-base font-medium transition-colors duration-300",
          isActive
            ? "text-[#872BFF] font-bold"
            : "text-[#1C1C1C] hover:text-[#872BFF]"
        )}
      >
        {item.name}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <motion.div
            className="bg-[#872BFF] rounded-full h-1"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isActive ? "75%" : isHovered ? "50%" : 0,
              opacity: isActive || isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: isActive ? 0 : 0.1,
            }}
            layoutId={`underline-${item.name}`}
          />
        </div>
      </Link>
    </motion.div>
  );
};

type SignUpFormState = {
  name: string;
  email: string;
  password: string;
  // passportNumber: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
};

export const Header: React.FC = () => {
  const pathname = usePathname();

  // Store last visited route before navigating
  useEffect(() => {
    if (pathname !== "/about") {
      sessionStorage.setItem("previousPage", pathname);
    }
  }, [pathname]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [modalType, setModalType] = useAtom(loginModalAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signUpForm, setSignUpForm] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    // passportNumber: "",
    country: "",
    phoneCode: "+94",
    phoneNumber: "",
  });
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginAsync, isPending: isLoggingIn } = useBasicLogin({
    onSuccess: (data) => {
      if (typeof window !== "undefined" && data) {
        const { token, refreshToken } = data as {
          token?: string;
          refreshToken?: string;
        };

        if (token) {
          localStorage.setItem("authToken", token);
          setAuthToken(token);
          setIsLoggedIn(true); // Update login status atom
        }

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          localStorage.removeItem("refreshToken");
        }
      }
    },
  });
  const { mutateAsync: registerAsync, isPending: isRegistering } = useRegister({
    onSuccess: (data) => {
      if (typeof window !== "undefined" && data) {
        const { token, refreshToken } = data as {
          token?: string;
          refreshToken?: string;
        };

        // If tokens are returned from registration, auto-login the user
        if (token) {
          localStorage.setItem("authToken", token);
          setAuthToken(token);
          setIsLoggedIn(true);

          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
        }
      }
    },
  });

  const { mutateAsync: logoutAsync } = useLogout({
    onSuccess: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      setAuthToken();
      setIsLoggedIn(false);
      setIsProfileMenuOpen(false);
      window.location.href = "/";
    },
  });

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    try {
      await logoutAsync();
      setIsLoggedIn(false);
    } catch (error) {
      // Even if logout fails, clear local state
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      setAuthToken();
      setIsLoggedIn(false);
      setIsProfileMenuOpen(false);
      router.push("/");
    } finally {
      setIsLoadingLogout(false);
    }
  };

  const phoneCodeOptions = [
    "+94",
    "+1",
    "+44",
    "+61",
    "+33",
    "+49",
    "+81",
    "+86",
  ];
  const countryOptions = [
    "Sri Lanka",
    "United States",
    "United Kingdom",
    "Australia",
    "France",
    "Germany",
    "Spain",
    "Italy",
    "Japan",
    "China",
  ];

  const isSignInOpen = modalType === "signIn";
  const isSignUpOpen = modalType === "signUp";
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const updateSignUpField = <K extends keyof SignUpFormState>(
    field: K,
    value: SignUpFormState[K]
  ) => {
    setSignUpForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetSignInForm = () => {
    setUsername("");
    setPassword("");
    setAuthError(null);
    setAuthNotice(null);
  };

  const resetSignUpForm = () => {
    setSignUpForm({
      name: "",
      email: "",
      password: "",
      // passportNumber: "",
      country: "",
      phoneCode: "+94",
      phoneNumber: "",
    });
    setTermsAccepted(false);
    setRegisterError(null);
  };

  const openSignInModal = (prefillEmail?: string) => {
    resetSignInForm();
    if (prefillEmail) {
      setUsername(prefillEmail);
    }
    setModalType("signIn");
  };

  const openSignUpModal = () => {
    resetSignUpForm();
    setModalType("signUp");
  };

  const closeModal = () => {
    setModalType(null);
    resetSignInForm();
    resetSignUpForm();
  };

  // Function to check if a navigation item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Initialize login status from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-neutral-100 transition-all duration-300 ",
          isScrolled
            ? "bg-white/50 shadow-lg border-b"
            : "bg-transparent shadow-none"
        )}
      >
        <div className="max-w-7xl mx-auto max-xl:px-2">
          <div className="flex items-center justify-between h-12 md:h-20">
            {/* Logo */}
            <div className="inline-block">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/">
                  <Image
                    src={getImageUrl("public/logo.avif")}
                    alt="ZephyraTravels"
                    width={100}
                    height={100}
                    quality={85}
                    loading="eager"
                    priority={true}
                    fetchPriority={"high"}
                    className="w-[79px] md:w-30 object-contain"
                    sizes="(max-width: 640px) 79px, 120px"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 gap-4">
              {navigationItems.map((item, index) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
                  index={index}
                />
              ))}
            </nav>

            {/* Sign In Button / Profile Avatar and Mobile Menu */}
            <div className="flex items-center gap-3 me-4">
              {isLoggedIn ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center  rounded-full bg-linear-to-r  transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#872BFF] to-[#6938D3] flex items-center justify-center text-white font-semibold text-sm">
                      {!isLoadingLogout ? <User size={18} /> : null}
                      {isLoadingLogout ? (
                        <FaSpinner className="animate-spin" />
                      ) : null}
                    </div>
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-40"
                          onClick={() => setIsProfileMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                        >
                          <Link
                            href="/dashboard"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <User size={18} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Profile
                            </span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut size={18} className="text-red-600" />
                            <span className="text-sm font-medium text-red-600">
                              Logout
                            </span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size={isMobile ? "sm" : "md"}
                  className="max-sm:text-[16px] cursor-pointer hidden sm:block"
                  onClick={() => openSignInModal()}
                >
                  Sign in
                </Button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X size={24} className="text-gray-700" />
                  ) : (
                    <HiMenuAlt2 size={28} className="text-black" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Sidebar */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop/Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-60 lg:hidden"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    mass: 0.8,
                  }}
                  className="fixed top-0 right-0 h-screen w-60 max-w-[50vw] bg-white shadow-2xl z-70 lg:hidden overflow-y-auto scrollbar-hide rounded-l-3xl"
                >
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-end p-6 border-b border-gray-100 bg-linear-to-r from-purple-50 to-white">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-white/80 transition-colors"
                    >
                      <X size={20} className="text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav className="flex flex-col py-2 min-h-[calc(100vh-140px)] pb-20">
                    {navigationItems.map((item, index) => (
                      <NavItem
                        key={item.name}
                        item={item}
                        isActive={isActive(item.href)}
                        index={index}
                        onClick={() => setIsMenuOpen(false)}
                        isMobile={true}
                      />
                    ))}
                  </nav>

                  {/* Sidebar Footer */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-gray-50 to-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#872BFF] to-[#6938D3] flex items-center justify-center text-white">
                            <User size={20} />
                          </div>
                          <span className="text-base font-medium text-gray-700">
                            Profile
                          </span>
                        </Link>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 bg-red-50 rounded-xl shadow-md hover:shadow-lg hover:bg-red-100 transition-all duration-300"
                        >
                          <LogOut size={20} className="text-red-600" />
                          <span className="text-base font-medium text-red-600">
                            Logout
                          </span>
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        size={isMobile ? "sm" : "md"}
                        className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => {
                          setIsMenuOpen(false);
                          openSignInModal();
                        }}
                      >
                        Sign in
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Sign In Modal */}
      <Dialog
        open={isSignInOpen}
        onClose={closeModal}
        className={`relative z-100 ${plusJakartaSans.className}`}
      >
        <div className=" fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="font-plus-jakarta-sans relative w-full max-w-120 rounded-[28px] bg-white px-8 py-6 shadow-[0_28px_80px_-20px_rgba(13,36,54,0.35)]">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close sign in modal"
            >
              <X size={18} />
            </button>

            {/* Centered logo + title */}
            <div className="flex flex-col items-center justify-center mb-4 gap-0">
              <Image
                src={getImageUrl("public/logo-auth-forms.avif")}
                alt="ZephyraTravels"
                width={100}
                height={100}
                quality={85}
                loading="eager"
                priority={true}
                fetchPriority={"high"}
                className="object-contain m-0 p-0"
              />
              <DialogTitle className="text-xl font-bold text-[#0c1421] leading-none m-0 p-0">
                ZephyraTravels
              </DialogTitle>
            </div>

            {/* Auth messages */}
            {authNotice && (
              <div className="mb-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-600">
                {authNotice}
              </div>
            )}
            {authError && (
              <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {authError}
              </div>
            )}

            {/* Form */}
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setAuthError(null);
                try {
                  await loginAsync({ username, password });
                  closeModal();
                } catch (err: any) {
                  // Show only the error field from API response
                  const errorMessage =
                    err.response?.data?.error ||
                    "Unable to sign in. Please check your credentials.";
                  setAuthError(errorMessage);
                }
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#0c1421]">
                  Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-[#e8d6ff] bg-[#f6f6f6] px-4 py-2.5 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none focus:ring-2 focus:ring-[#e8d6ff]"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0c1421]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#e8d6ff] bg-[#f6f6f6] px-4 py-2.5 pr-12 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none focus:ring-2 focus:ring-[#e8d6ff]"
                    placeholder="At least 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#872bff] transition-colors cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#872bff] transition-colors hover:text-[#6938d3]"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#872bff] py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#6f1fe1] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center gap-3 text-xs text-[#294957]">
                <span className="h-px flex-1 bg-[#cfdfe2]" />
                Or
                {/* sign in with */}
                <span className="h-px flex-1 bg-[#cfdfe2]" />
              </div>

              {/* <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#f3f9fa] py-2.5 text-sm font-semibold text-[#313957] transition-all hover:border-[#dae9ec] hover:bg-white"
                >
                  <FcGoogle className="text-lg" /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#f3f9fa] py-2.5 text-sm font-semibold text-[#313957] transition-all hover:border-[#dae9ec] hover:bg-white"
                >
                  <FaFacebookF className="text-base text-[#1877f2]" /> Facebook
                </button>
              </div> */}
            </form>

            <p className="mt-4 text-center text-sm text-[#122b31]">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={openSignUpModal}
                className="font-semibold text-[#872bff] transition-colors hover:text-[#6938d3] cursor-pointer"
              >
                Sign up
              </button>
            </p>

            <p className="mt-4 text-center text-xs uppercase text-[#959cb6]">
              © 2025 All Rights Reserved
            </p>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog
        open={isSignUpOpen}
        onClose={closeModal}
        className={`relative z-100 ${plusJakartaSans.className}`}
      >
        {/* Transparent background overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Centered dialog */}
        <div className="fixed inset-0 flex items-center justify-center p-1">
          <DialogPanel className="relative w-full max-w-88 md:max-w-160 rounded-[40px] bg-white px-8 py-3 shadow-[0_28px_80px_-20px_rgba(13,36,54,0.35)]">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close sign up modal"
            >
              <X size={18} />
            </button>

            {/* Logo and title */}
            <div className="flex flex-col items-center justify-center mb-4 gap-0">
              <Image
                src={getImageUrl("public/logo-auth-forms.avif")}
                alt="ZephyraTravels"
                width={100}
                height={100}
                quality={85}
                loading="eager"
                priority={true}
                fetchPriority={"high"}
                className="object-contain m-0 p-0"
              />
              <DialogTitle className="text-xl font-bold text-[#0c1421] leading-none m-0 p-0">
                ZephyraTravels
              </DialogTitle>
            </div>

            {registerError && (
              <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {registerError}
              </div>
            )}

            {/* Form */}
            <form
              className="mt-2 space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setRegisterError(null);

                if (!termsAccepted) {
                  setRegisterError(
                    "Please accept the terms & policy to continue."
                  );
                  return;
                }

                const sanitizedPhone =
                  `${signUpForm.phoneCode}${signUpForm.phoneNumber}`.replace(
                    /\s+/g,
                    ""
                  );

                try {
                  const registerResult = await registerAsync({
                    name: signUpForm.name,
                    // passportNumber: signUpForm.passportNumber,
                    email: signUpForm.email,
                    password: signUpForm.password,
                    phone: sanitizedPhone,
                    country: signUpForm.country,
                  });

                  // Check if tokens were returned from registration
                  const hasTokens =
                    registerResult &&
                    typeof registerResult === "object" &&
                    "token" in registerResult;

                  resetSignUpForm();

                  if (hasTokens) {
                    // Auto-login: close modal without opening sign-in
                    closeModal();
                  } else {
                    // No tokens returned: show sign-in modal with prefilled email
                    const emailToPrefill = signUpForm.email;
                    openSignInModal(emailToPrefill);
                    setAuthNotice("Registration successful! Please sign in.");
                  }
                } catch (err: any) {
                  // Show only the error field from API response without technical logging
                  const errorMessage =
                    err.response?.data?.error ||
                    "Unable to sign up right now. Please try again.";

                  setRegisterError(errorMessage);
                }
              }}
            >
              <div className="grid gap-3 md:grid-cols-2 mb-0">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#0c1421]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={signUpForm.name}
                    onChange={(e) => updateSignUpField("name", e.target.value)}
                    className="w-full rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none"
                    placeholder="ex: Jon Smith"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#0c1421]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={signUpForm.email}
                    onChange={(e) => updateSignUpField("email", e.target.value)}
                    className="w-full rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 mb-0">
                <label className="text-xs font-medium text-[#0c1421]">
                  Password
                </label>
                <input
                  type="password"
                  value={signUpForm.password}
                  onChange={(e) =>
                    updateSignUpField("password", e.target.value)
                  }
                  className="w-full rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none"
                  placeholder="At least 8 characters"
                  required
                />
              </div>

              {/* <div className="space-y-1 mb-0">
                <label className="text-xs font-medium text-[#0c1421]">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={signUpForm.passportNumber}
                  onChange={(e) =>
                    updateSignUpField("passportNumber", e.target.value)
                  }
                  className="w-full rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none"
                  placeholder="ABC1234567"
                  required
                />
              </div> */}

              <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                <div className="relative space-y-1">
                  <label className="text-xs font-medium text-[#0c1421]">
                    Country
                  </label>
                  <select
                    value={signUpForm.country}
                    onChange={(e) =>
                      updateSignUpField("country", e.target.value)
                    }
                    className="w-full min-w-0 appearance-none rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-xs sm:text-sm text-[#0c1421] focus:border-[#872bff] focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>

                  {/* Custom purple dropdown arrow */}
                  <svg
                    className="pointer-events-none absolute right-2 top-[50%] h-4 w-4 sm:h-5 sm:w-5 text-[#872bff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#0c1421]">
                    Phone Number
                  </label>
                  <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                    {/* Phone code dropdown with custom arrow */}
                    <div className="relative min-w-0">
                      <select
                        value={signUpForm.phoneCode}
                        onChange={(e) =>
                          updateSignUpField("phoneCode", e.target.value)
                        }
                        className="w-full min-w-0 appearance-none rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-2 py-2 text-xs sm:text-sm text-[#0c1421] focus:border-[#872bff] focus:outline-none"
                      >
                        {phoneCodeOptions.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown arrow */}
                      <svg
                        className="pointer-events-none absolute right-1 sm:right-2 top-[50%] h-4 w-4 sm:h-5 sm:w-5 text-[#872bff] -translate-y-1/2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Phone number input */}
                    <input
                      type="tel"
                      value={signUpForm.phoneNumber}
                      onChange={(e) =>
                        updateSignUpField("phoneNumber", e.target.value)
                      }
                      className="w-full min-w-0 rounded-xl border border-[#e8d6ff] bg-[#f6f6f6] px-3 py-2 text-xs sm:text-sm text-[#0c1421] placeholder:text-[#8897ad] focus:border-[#872bff] focus:outline-none"
                      placeholder="771234567"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-[#122b31]">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-px h-4 w-4 rounded border border-[#872bff] text-[#872bff] focus:ring-[#872bff]"
                />
                <span>
                  I understood the{" "}
                  <Link
                    href="/policies/[...slug]"
                    className="font-semibold text-[#872bff] transition-colors hover:text-[#6938d3]"
                  >
                    Terms &amp; Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#872bff] py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#6f1fe1] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                disabled={isRegistering || !termsAccepted}
              >
                {isRegistering ? "Creating account..." : "Sign up"}
              </button>

              <div className="flex items-center gap-3 text-xs text-[#294957]">
                <span className="h-px flex-1 bg-[#cfdfe2]" />
                Or
                {/* sign up with */}
                <span className="h-px flex-1 bg-[#cfdfe2]" />
              </div>

              {/* <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-[#f3f9fa] py-2 text-xs font-semibold text-[#313957] transition-all hover:border-[#dae9ec] hover:bg-white"
                >
                  <FcGoogle className="text-base" /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-[#f3f9fa] py-2 text-xs font-semibold text-[#313957] transition-all hover:border-[#dae9ec] hover:bg-white"
                >
                  <FaFacebookF className="text-sm text-[#1877f2]" /> Facebook
                </button>
              </div> */}
            </form>

            <p className="mt-4 text-center text-xs text-[#122b31]">
              Have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  openSignInModal(signUpForm.email);
                  setAuthNotice(null);
                }}
                className="font-semibold text-[#872bff] transition-colors hover:text-[#6938d3] cursor-pointer"
              >
                Sign in
              </button>
            </p>

            <p className="mt-5 text-center text-[10px] uppercase text-[#959cb6]">
              © 2025 All Rights Reserved
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
