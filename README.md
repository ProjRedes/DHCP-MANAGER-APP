# DHCPManager App

Sistema web para gerenciamento de reservas DHCP, integrado ao Google Sheets como banco de dados. Ideal para equipes de TI gerenciarem hosts e VLANs de forma simples e centralizada.

## 🔧 Tecnologias Utilizadas

- **Frontend:** React.js (Create React App, React Router, Axios)
- **Backend:** ASP.NET Core 9 (com JWT e Swagger)
- **Banco de Dados:** Google Sheets API
- **Autenticação:** JWT Bearer
- **Ambiente:** Visual Studio 2022, Node.js, PowerShell

## 🚀 Funcionalidades

- Cadastro e visualização de hosts DHCP
- Gerenciamento de VLANs
- Dropdown dinâmico com VLANs no formulário de cadastro
- Integração com planilha do Google Sheets
- Interface responsiva

## 🛠️ Instalação

### Backend (.NET)
```bash
git clone https://github.com/ProjRedes/DHCP-MANAGER-API.git
cd DHCP-MANAGER-API
dotnet restore
dotnet run
```

### Frontend (React)
```bash
cd dhcpmanager-frontend
npm install
npm start
```

## 📎 Estrutura

```
DHCPManagerAPI/
  ├── Controllers/
  ├── Models/
  ├── Services/
  ├── Program.cs
  ├── credentials.json
  └── appsettings.Development.json

dhcpmanager-frontend/
  ├── src/components/Navbar.js
  ├── src/pages/CadastroHost.js
  ├── src/pages/VLANManager.js
  └── src/services/api.js
```

## ✅ Status: Em desenvolvimento (v0.9 Beta)
