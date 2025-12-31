import { useAuth } from "@/contexts/AuthContext";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await signUp(name, email, senha);
      if (error) {
        console.error("[SignUp] Erro ao criar conta:", error);
      }
    } catch (error) {
      console.error("[SignUp] Exceção não tratada:", error);
    } finally {
      setLoading(false);
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 to-indigo-400 p-4">
      <div className="bg-white/95 w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Criar conta
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Cadastre-se para começar sua jornada
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              placeholder="********"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-400 hover:bg-indigo-400 transition rounded-lg text-white font-semibold text-center cursor-pointer"
          >
            Criar conta
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">ou</span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        <p className="mt-2 text-center text-gray-600">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-medium hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
