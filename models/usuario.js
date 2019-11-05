const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es un dato requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es un dato requerido'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no es válido']
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  },
  password: {
    type: String,
    required: [true, 'La contraseña es un dato requerido'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Encriptar password con bcrypt
UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Se devuelve el token
UsuarioSchema.methods.obtenerToken = function() {
  return jwt.sign({ id: this._id }, config.get('jwt_secret'), {
    expiresIn: config.get('jwt_expires')
  })
};

// Comprueba si la contraseña facilitada corresponde con la almacenada en MongoDB
UsuarioSchema.methods.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
