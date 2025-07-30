# 📁 Storio – Your Personal Cloud Storage Solution

Storio is a secure and user-friendly file storage app built with the **MERN stack**. It allows users to upload, manage, preview, and share files and folders, with support for cloud storage upgrades via **Razorpay**. Admins can manage users and plans via a dedicated panel.

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT-based with cookies
- **Storage**: File system (local for now)
- **Payment**: Razorpay Integration
- **Admin Features**: Ban users, manual plan upgrades, view usage stats

---

## 🚀 Features

### User
- ✅ Register/Login with secure JWT authentication
- ✅ Upload, preview, and delete files
- ✅ Create and delete folders
- ✅ View storage usage
- ✅ Change plans with Razorpay payments
- ✅ Profile image upload
- ✅ File soft-delete (Trash system)

### Admin
- 👑 View all users and their plan details
- 👑 Ban or unban users
- 👑 Manually change user plans and storage
- 👑 Monitor overall usage

---

## 📁 Folder Structure

server/
├── app.js
├── config/
│ └── dbConfig.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── public/
│ └── uploads/
└── utils/
client/
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.jsx

## 🔒 Security
- Authenticated routes are protected using a custom AuthCheck middleware
- All uploaded files are user-isolated in /uploads/<userId>/filename.ext
- Admin routes are protected with role checks

## ✨ Upcoming Features

- 🔄 File versioning
- 🗂 Folder sharing
- ☁️ AWS S3 or Cloudinary integration
- 📈 User analytics dashboard


## 💡 Author
Ambarish Chatterjee
LinkedIn | GitHub

## 📫 Feedback
Have feedback, suggestions, or want to report a bug?
Open an issue or email me at amby008@gmail.com.com.
