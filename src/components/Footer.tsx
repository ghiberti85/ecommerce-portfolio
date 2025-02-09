// src/components/Footer.tsx
'use client';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center mt-10">
      <p className="text-sm">
        🚀 Desenvolvido com 💙 por <span className="font-semibold">Fernando Ghiberti</span>
      </p>
      <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} - Todos os direitos reservados.</p>
    </footer>
  );
};
