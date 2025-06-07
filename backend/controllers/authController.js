const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        nom: user.nom,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    res.json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer le profil de l'utilisateur connecté
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        nom: user.nom,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
