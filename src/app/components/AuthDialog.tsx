"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
// 1. Importamos confirmSignUp para validar el código
import { signIn, signUp, confirmSignUp } from 'aws-amplify/auth';

export function AuthDialog({ onAuthSuccess }: { onAuthSuccess?: (username: string) => void }) {
  // 2. Actualizamos los estados para incluir 'verify' y el código
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  // 3. Modificamos la función handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await signIn({ username: email, password });
        
      } else if (mode === 'register') {
        if (password !== confirmPassword) {
           setError('Las contraseñas no coinciden.');
           return;
        }
        await signUp({ username: email, password });
        setMode('verify'); // Cambiamos a la pantalla del código
        return; // Detenemos la función para que el usuario escriba su código
        
      } else if (mode === 'verify') {
        await confirmSignUp({ username: email, confirmationCode: code });
        await signIn({ username: email, password }); // Logeo automático tras verificar
      }
      
      // --- ZONA SEGURA ---
      // Solo llega aquí si todo el proceso fue un éxito
      localStorage.setItem('keylink_user', email);
      
      if (onAuthSuccess) {
        onAuthSuccess(email); 
      }
      
      // Reseteamos el modal al cerrar
      setOpen(false); 
      setMode('login');
      setCode('');
      setPassword('');

    } catch (err: any) {
      console.error("AWS rechazó la acción:", err);
      
      // Manejo específico de errores para guiar al usuario
      if (err.name === 'CodeMismatchException') {
        setError('El código es incorrecto. Intenta de nuevo.');
      } else if (err.name === 'UserNotConfirmedException') {
        setError('Tu cuenta no está confirmada. Ingresa el código que enviamos a tu correo.');
        setMode('verify');
      } else if (err.name === 'UsernameExistsException') {
        setError('Este correo ya está registrado.');
      } else {
        setError('Credenciales incorrectas o hubo un error en el servidor.');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      setOpen(value);
      if (value) {
        setError('');
        setMode('login'); // Siempre abre en login por defecto
      }
    }}>
      <DialogTrigger asChild>
        <button className="text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors">
          Iniciar Sesión
        </button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900 text-[#E2DCD6] border border-white/10 shadow-2xl shadow-[#5C00FF]/20 px-6 py-6 sm:px-10 sm:py-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-black">Bienvenido a KeyLink</DialogTitle>
          <DialogDescription className="text-[#E2DCD6]/70 max-w-xl mx-auto mt-3">
            Accede a tu cuenta o crea una nueva en un solo lugar. Mantén tu estilo y conecta con la tecnología retro moderna.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 rounded-[2rem] bg-neutral-800 border border-white/10 p-6 shadow-sm shadow-black/20">
          
          {/* Ocultamos los botones de Login/Register si estamos en modo verificación */}
          {mode !== 'verify' && (
            <div className="grid grid-cols-2 gap-2 rounded-full bg-[#2A1D4A]/80 p-1 text-sm font-semibold text-[#E2DCD6]/70">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`rounded-full py-2 transition-colors ${
                  mode === 'login'
                    ? 'bg-[#5C00FF] text-white shadow-lg shadow-[#5C00FF]/20'
                    : 'hover:bg-white/10'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`rounded-full py-2 transition-colors ${
                  mode === 'register'
                    ? 'bg-[#5C00FF] text-white shadow-lg shadow-[#5C00FF]/20'
                    : 'hover:bg-white/10'
                }`}
              >
                Crear Cuenta
              </button>
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            
            {/* --- PANTALLA DE VERIFICACIÓN --- */}
            {mode === 'verify' ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <p className="text-sm text-[#E2DCD6]/80 text-center mb-6">
                  Hemos enviado un código a <strong>{email}</strong>. Ingrésalo abajo para confirmar tu cuenta.
                </p>
                <label className="block text-sm font-medium text-[#E2DCD6]/80 text-center">
                  Código de Verificación
                  <Input
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-4 bg-neutral-900 border border-white/10 text-[#E2DCD6] placeholder:text-[#E2DCD6]/30 text-center tracking-[0.5em] text-2xl h-14 font-mono"
                    required
                    maxLength={6}
                  />
                </label>
              </div>
            ) : (
              
              /* --- PANTALLA NORMAL (LOGIN / REGISTRO) --- */
              <>
                <label className="block text-sm font-medium text-[#E2DCD6]/80">
                  Correo Electrónico
                  <Input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 bg-neutral-900 border border-white/10 text-[#E2DCD6] placeholder:text-[#E2DCD6]/45"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-[#E2DCD6]/80">
                  Contraseña
                  <Input
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-3 bg-neutral-900 border border-white/10 text-[#E2DCD6] placeholder:text-[#E2DCD6]/45"
                    required
                  />
                </label>

                {mode === 'register' && (
                  <label className="block text-sm font-medium text-[#E2DCD6]/80">
                    Confirmar Contraseña
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-3 bg-neutral-900 border border-white/10 text-[#E2DCD6] placeholder:text-[#E2DCD6]/45"
                      required
                    />
                  </label>
                )}
              </>
            )}

            <div className="mt-6 flex flex-col items-center w-full gap-4">
              <Button
                type="submit"
                className="w-full bg-[#5C00FF] hover:bg-[#2D0396] text-white shadow-lg shadow-[#5C00FF]/30 text-base font-semibold py-3 rounded-full flex items-center justify-center gap-2"
              >
                {mode === 'login' && 'Entrar'}
                {mode === 'register' && 'Crear Cuenta'}
                {mode === 'verify' && 'Verificar y Entrar'}
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              {mode !== 'verify' ? (
                <button
                  type="button"
                  className="text-sm text-[#E2DCD6]/70 hover:text-[#E2DCD6]"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login'
                    ? '¿No tienes una cuenta? Crear ahora'
                    : '¿Ya tienes cuenta? Iniciar Sesión'}
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm text-[#E2DCD6]/70 hover:text-[#E2DCD6]"
                  onClick={() => setMode('login')}
                >
                  Volver a Iniciar Sesión
                </button>
              )}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}