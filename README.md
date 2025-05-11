# CodeDash. - QR Generator

A curated gallery of mustard-colored inspiration.

CodeDash QR Generator is a clean, modern QR code generator and management app built with Next.js and Supabase. The app allows authenticated users to quickly create and download QR codes from various inputs (text, URLs, email addresses, PDFs, or image uploads). It features a responsive, user-friendly interface with smooth animations provided by Framer Motion.

---

## 📸 Demo

🧪 Live Project: [codedash-two.vercel.app](https://codedash-two.vercel.app/)  
📁 GitHub Repository: [github.com/mardimanisha/CodeDash.](https://github.com/mardimanisha/CodeDash.)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Learnings](#learnings)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## ✨ Features

- 🔐 **Authentication** with Supabase (Email & Google OAuth)
- 📥 **QR code generation** from text, URLs, images, PDFs, and email content
- ⬇️ **Download options** for QR codes.
- 📦 **File upload** support for storing QR-linked files (images & PDFs)
- 🚦 **Content-type selector** with dynamic input UI
- ⚡ **Clean, responsive UI** with smooth animations

---

## 🛠 Tech Stack

| Tech          | Purpose             |
| ------------- | ------------------- |
| Next.js       | Framework & Routing |
| TypeScript    | Type Safety         |
| Tailwind CSS  | Styling             |
| Supabase      | Auth, Storage       |
| Framer Motion | Animations          |
| QRCode.react  | QR Code Rendering   |
| Shadcn/UI     | UI Component System |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mardimanisha/CodeDash..git
cd CodeDash.
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

```

### 4. Run the App

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🧑‍💻 Usage

- Choose a content type (Text, URL, Image, PDF, or Email).
- Enter the content or upload a file.
- Click "Create" to generate your QR code.
- Download it as image.

---

## 📁 Folder Structure

```
src/
│
├── app/                 # App router & page components
│
├── components/          # Reusable UI components
│   ├── qr
│   ├── ui
│   ├── AuthModel.tsx
│   ├── DownloadDialog.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│
│
├── context/             # Auth context provider
|   ├── AuthContext.tsx
|
├── lib/                 # Supabase client & helpers
│   ├── supabaseClient.ts
│   ├── uploadFile.ts
│   ├── utils.ts
│

```

---

## 🧠 Learnings

This project helped me:

- Implementing Supabase authentication with modal flows and session management.
- Handling dynamic input types for flexible QR generation.
- Uploading files securely to Supabase Storage and retrieving public URLs.
- Managing conditional rendering and state transitions smoothly.
- Building scalable architecture with modular React components and context.

---

## 🔮 Future Improvements

- 📊 **Dashboard**: View, manage, and delete past QR codes
- 📈 **Analytics**: Track QR scan counts, locations, and devices
- 💾 **Save to Account**: Automatically store QR codes to user's profile
- 🔍 **Search & Filters**: Quickly locate specific QR codes
- 📆 **History**: View generation and download history
- 📱 **PWA Support**: Installable mobile experience
- ✨ **Custom Themes**: Change QR color, background, and shape

---

## 👩‍💻 Author

Manisha Mardi  
Frontend Developer \| Builder \| Explorer  
💼 [LinkedIn](https://linkedin.com/in/manishamardi)

---

## 📄 License

This project is licensed under the MIT License.

---

_"If you enjoyed this project or found it useful, please ⭐ the repo and share it with your friends and fellow developers!"_
