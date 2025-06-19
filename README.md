# Next.js TalkJS Chat Prototype

A **real-time chat app** built with [Next.js App Router](https://nextjs.org/docs/app), [Prisma](https://www.prisma.io), and [TalkJS](https://talkjs.com). Messages are stored in a PostgreSQL database using TalkJS webhooks, making this a practical starting point for building feature-rich, scalable chat applications.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/garriga11/talk
cd next-talkjs-chat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root with the following:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
TALKJS_APP_ID=your_talkjs_app_id
TALKJS_SECRET=your_talkjs_secret
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🛠 Features

- **Authentication** via NextAuth  
- **Real-time messaging** powered by TalkJS  
- **Message storage** via Prisma and PostgreSQL  
- **Webhook integration** to persist TalkJS messages  
- Built on **Next.js App Router**

---

## 🚀 Deployment

This app is optimized for deployment on [Vercel](https://vercel.com):

```bash
vercel deploy
```

Ensure production `.env` values are set in your Vercel project settings.

---

## 🧠 Resources

- [TalkJS Docs](https://talkjs.com/docs)  
- [Prisma Docs](https://www.prisma.io/docs)  
- [Next.js App Router](https://nextjs.org/docs/app)  
- [NextAuth.js Docs](https://next-auth.js.org)

See more at garriga19programs.com
