<div align="center">
  <h1>Todo-List</h1>
</div>

A repository to project **Task Manegement System** code.

# 🎮 Getting started

**Environment Requirements**

If you are not using Docker to run the application, please follow the instructions below to set up your development environment:

1. **Node.js**: Download and install Node.js version `18.20.0`.

   - [Node.js 18.20.0](https://nodejs.org/en/download/releases/)

2. **npm**: After installing Node.js, make sure the npm version is `10.5.0`.
   - You can update npm with the following command:
     ```bash
     npm install -g npm@10.5.0
     ```

These versions are recommended to ensure compatibility and proper functioning of the application. If you are using Docker, these steps are not necessary as the environment is configured within the container.

<h3 style="font-size: 18px;">🧬 Clone this repository</h3>

```bash
git clone https://github.com/GabrielGuerreir0/todo-list-manager.git
```

<h3 style="font-size: 18px;"> Install dependencies</h3>

```bash
npm install
```

<h3 style="font-size: 18px;">🚀 Run the application</h3>

```bash
npm run dev
```

Open [http://localhost:5137](http://localhost:5137) to view it in the browser.

Before starting the project you must create a .env file and add the following global variables:

```bash
VITE_FIREBASE_API_KEY=API_key_example
VITE_FIREBASE_AUTH_DOMAIN=auth_domain_example
VITE_FIREBASE_PROJECT_ID=project_id_example
VITE_FIREBASE_STORAGE_BUCKET=storage_bucket_example
VITE_FIREBASE_MESSAGING_SENDER_ID=messaging_sender_id_example
VITE_FIREBASE_APP_ID=app_id_example
VITE_FIREBASE_MEASUREMENT_ID=measurement_id_example
```

To access this data go to [fire base](https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=latam-BR-all-pt-dr-SKWS-all-all-trial-p-dr-1707800-LUAC0016210&utm_content=text-ad-none-any-DEV_c-CRE_545609612280-ADGP_Hybrid%20%7C%20SKWS%20-%20PHR%20%7C%20Txt_Compute-Firebase-KWID_43700066431125285-kwd-307216164692&utm_term=KW_firebase-ST_Firebase&gad_source=1&gclid=Cj0KCQjwq_G1BhCSARIsACc7Nxoal5egNzl2bs2iGLzRxpRorNi6a391gzzrGMeq0eadUg189C_KKiMaAnxVEALw_wcB&gclsrc=aw.ds&hl=pt-br) create your account or log in, create a new project configure authentication via email and password, configure the firestore database, then go to project settings and there will be your variables.

<h3 style="font-size: 18px;">✅ Test</h3>

```bash
npm run test
```

<h3 style="font-size: 18px;">🍷 Build</h3>

```bash
npm run build
```

Builds the app for production to the `build` folder.

# 📦 Docker

If you prefer to use Docker, you can build the image with the following command:

```bash
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Before starting the project you must create a .env.production file and add the following global variables:

```bash
VITE_FIREBASE_API_KEY=API_key_example
VITE_FIREBASE_AUTH_DOMAIN=auth_domain_example
VITE_FIREBASE_PROJECT_ID=project_id_example
VITE_FIREBASE_STORAGE_BUCKET=storage_bucket_example
VITE_FIREBASE_MESSAGING_SENDER_ID=messaging_sender_id_example
VITE_FIREBASE_APP_ID=app_id_example
VITE_FIREBASE_MEASUREMENT_ID=measurement_id_example
```

To access this data go to [fire base](https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=latam-BR-all-pt-dr-SKWS-all-all-trial-p-dr-1707800-LUAC0016210&utm_content=text-ad-none-any-DEV_c-CRE_545609612280-ADGP_Hybrid%20%7C%20SKWS%20-%20PHR%20%7C%20Txt_Compute-Firebase-KWID_43700066431125285-kwd-307216164692&utm_term=KW_firebase-ST_Firebase&gad_source=1&gclid=Cj0KCQjwq_G1BhCSARIsACc7Nxoal5egNzl2bs2iGLzRxpRorNi6a391gzzrGMeq0eadUg189C_KKiMaAnxVEALw_wcB&gclsrc=aw.ds&hl=pt-br) create your account or log in, create a new project configure authentication via email and password, configure the firestore database, then go to project settings and there will be your variables.

# 🚀 Techs

- React
- React Router DOM
- Jest

# 👨🏻‍💻 Author

- GitHub: [GabrielGuerreir0](https://github.com/GabrielGuerreir0)
- LinkedIn: [Gabriel Guerreiro](https://www.linkedin.com/in/gabriel-guerreiro-8b13a825a/)

# ✨ Show your support

Give a ⭐ if this project helped you or if you liked it!
