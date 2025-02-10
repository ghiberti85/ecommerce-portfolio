🛒 E-commerce Portfolio

E-commerce Portfolio é um projeto de loja virtual desenvolvido com Next.js, Tailwind CSS e TypeScript. Ele simula um ambiente de compra online e pode ser utilizado como referência para projetos futuros.

📌 Funcionalidades
✅ Listagem de produtos com filtros e ordenação
✅ Pesquisa dinâmica no header
✅ Página de detalhes do produto com avaliações e compartilhamento
✅ Carrinho de compras com animações e resumo da compra
✅ Salvar para mais tarde e mover itens entre o carrinho e lista de desejos
✅ Checkout Simulado com formulário de pagamento
✅ Responsividade completa para desktop e mobile

🚀 Tecnologias Utilizadas
Next.js (Framework React)
Tailwind CSS (Estilização)
TypeScript (Tipagem e segurança)
Framer Motion (Animações)
Lucide React (Ícones)
React Hook Form (Formulários)
React Hot Toast (Notificações)
🔧 Instalação e Uso
1️⃣ Clone o repositório
bash
Copy
Edit
git clone https://github.com/seu-usuario/ecommerce-portfolio.git
cd ecommerce-portfolio
2️⃣ Instale as dependências
bash
Copy
Edit
npm install
# ou
yarn install
3️⃣ Inicie o servidor local
bash
Copy
Edit
npm run dev
# ou
yarn dev
Acesse o projeto no navegador: http://localhost:3000

🌐 Deploy na Vercel
O projeto já está configurado para ser publicado na Vercel.

📤 Publicar na Vercel
Faça login na Vercel
Conecte o repositório do GitHub
Clique em Deploy
Dica: Qualquer alteração feita na branch main será automaticamente publicada na Vercel.

📂 Estrutura do Projeto
scss
Copy
Edit
📦 ecommerce-portfolio
├── 📁 public
│   ├── placeholder.svg (Imagem padrão)
│
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 cart
│   │   │   ├── page.tsx (Página do carrinho)
│   │   ├── 📁 checkout
│   │   │   ├── page.tsx (Página de checkout)
│   │   ├── 📁 product
│   │   │   ├── [id] (Página dinâmica do produto)
│   │   │   │   ├── page.tsx
│   │   ├── 📁 category
│   │   │   ├── [category] (Página de categorias)
│   │   │   │   ├── page.tsx
│   │   ├── 📁 layout.tsx (Layout principal)
│   │   ├── 📁 page.tsx (Página inicial)
│
│   ├── 📁 components
│   │   ├── 📁 layout
│   │   │   ├── Header.tsx (Navbar e pesquisa)
│   │   │   ├── Footer.tsx (Rodapé)
│   │   ├── 📁 product
│   │   │   ├── ProductList.tsx (Lista de produtos)
│   │   │   ├── ProductFilter.tsx (Filtro de produtos)
│   │   │   ├── ProductDetails.tsx (Detalhes do produto)
│   ├── 📁 context
│   │   ├── CartContext.tsx (Gerenciamento do carrinho)
│   ├── 📁 hooks
│   │   ├── useProducts.ts (Gerencia os produtos)
│   ├── 📁 mocks
│   │   ├── products.ts (Produtos mockados)
│   ├── 📁 utils
│   │   ├── normalizeString.ts (Normaliza strings)
│   ├── 📁 styles
│   │   ├── globals.css (Estilos globais)
│
├── next.config.js (Configuração do Next.js)
├── package.json (Dependências do projeto)
📝 Melhorias Futuras
🔄 Integração com uma API real (ex: Firebase ou Strapi)
🛒 Sistema de usuários e autenticação
📦 Histórico de pedidos
📊 Dashboard para visualizar vendas
👨‍💻 Desenvolvedor
Fernando Ghiberti
🚀 Desenvolvido com 💙 por Fernando Ghiberti

📧 Email: ghiberti85@gmail.com
💼 Portfólio: [Em breve]

🌟 Contribuição
Se quiser contribuir com o projeto:

Fork o repositório 🍴
Crie uma branch (git checkout -b minha-feature)
Faça um commit (git commit -m 'Adicionando nova funcionalidade')
Push na branch (git push origin minha-feature)
Abra um Pull Request ✅
📜 Licença
Este projeto está sob a Licença MIT. Sinta-se livre para utilizar e modificar. 🚀