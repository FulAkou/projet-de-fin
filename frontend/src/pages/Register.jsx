import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/auth/register", {
        nom: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="label">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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
              <label htmlFor="confirmPassword" className="label">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={loading}
              >
                {loading ? "Inscription en cours..." : "S'inscrire"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Déjà inscrit ?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-green-600 hover:text-green-500"
                  >
                    Se connecter
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

export default Register;
