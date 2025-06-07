import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/auth/login", formData);

      // Stocker le token dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Stocker les informations de l'utilisateur
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Connexion réussie !");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={loading}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-green-600 hover:text-green-500"
                  >
                    S'inscrire
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
