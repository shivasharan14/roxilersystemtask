import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      console.log("LOGIN RESPONSE:", res.data); // हे चेक करण्यासाठी

      // रिस्पॉन्समध्ये टोकन आहे का ते बघू
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role); 
        
        // जर बॅकएंडला userId पाठवायचा असेल, तर बॅकएंड कंट्रोलरमध्ये तो ॲड कर
        // सध्यासाठी मेसेज दाखवू
        toast.success(res.data.message || "Login Successful 🎉");
        navigate("/dashboard");
      } else {
        toast.error("Login Failed: Token not received");
      }
    } catch (error) {
      console.log("Login Error:", error);
      // बॅकएंडचा एरर मेसेज दाखवणे
      const errMsg = error.response?.data?.error || "Login Failed ❌";
      toast.error(errMsg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">

            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;