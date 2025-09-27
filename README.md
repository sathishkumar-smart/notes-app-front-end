# Keep Notes 

This is the **Next.js 15 frontend** for the **Keep Notes** application — a simple and responsive note-taking app.
The frontend communicates with the backend API to manage notes, including create, read, update, and delete (CRUD) operations.

---

## Features

* Built with **Next.js 15** (React 18)
* **Responsive design** with TailwindCSS
* Notes creation, editing, and deletion
* Modern UI with animations (Framer Motion)
* Docker-ready for production

---

## About the App

**Keep Notes** allows users to:

* Add and manage personal notes
* Edit existing notes
* Delete notes with confirmation
* Rich text or plain text note content
* Seamless login/logout functionality

The frontend relies on a backend API for storing and retrieving notes.

---

## Setup (Local Development)

1. Clone the repository:

```bash
git clone https://github.com/sathishkumar-smart/notes-app-front-end.git
cd notes-app-front-end
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000   # Replace with your backend URL
```

> `NEXT_PUBLIC_BACKEND_URL` is used in the frontend to make API requests to your backend.

4. Run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Docker Usage

You can run the frontend using Docker for production or testing:

1. Build the Docker image:

```bash
docker build -t keep-notes-frontend .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env NEXT_PUBLIC_BACKEND_URL=http://host.docker.internal:8000 keep-notes-frontend
```

> Make sure the backend API is accessible from the container.

3. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Scripts

* `npm run dev` → Start local development server
* `npm run build` → Build production version
* `npm start` → Start production server
* `npm run lint` → Run linter

---

## Technologies Used

* **Next.js 15**
* **React 18**
* **TailwindCSS**
* **Framer Motion** (animations)
* **Docker** (optional)

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT License
