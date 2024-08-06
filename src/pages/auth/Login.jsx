import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { Eye, EyeOff } from 'lucide-react';
import Loader from "../../components/Loader";

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const onSubmit = async (data) => {
        console.log(data);
        setIsSubmitting(true);
        try {
          const res = await apiLogin({
            email: data.email,
            password: data.password,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          // setTimeout(() => {
          toast.success(res.data.message);
          navigate("/dashboard");
          // }, 300);
        } catch (error) {
          console.log(error);
          toast.error("An error occured!");
        } finally {
          setIsSubmitting(false);
          // clearTimeout(timeout);
        }
      };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-10 rounded shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-1 text-lg leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", { required: "Password is required",
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  }
             })}
          />
          <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pt-8 pr-3 flex items-center justify-center text-sm leading-5 focus:outline-none text-gray-500"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
        </div>
        {errors.password && (
                <p className="text-red-500 -mt-6">{errors.password.message}</p>
              )}
        <div className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
          >
            {isSubmitting ? <Loader /> : "Login"}
          </button>
        </div>

        <div className="pt-6 text-center justify-center">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </div>
      </form>
    </div>
  )
}

export default Login