# pruebaApp

Aplicación Android de ejemplo para demostración o pruebas. Este proyecto contiene una aplicación desarrollada en VSCode con Android Studio utilizando ionic/angular.

## 🧰 Requisitos previos

Antes de clonar y ejecutar este proyecto, asegúrate de tener lo siguiente instalado:

- [Git](https://git-scm.com/)
- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)
- Android Studio (para compilación y despliegue nativo)

  Verifica las instalaciones con:

```bash
node -v
npm -v
ionic -v

## 🚀 Clonar y abrir el proyecto

1. **Clona el repositorio**

   Abre una terminal o línea de comandos y ejecuta:

   git clone https://github.com/caarenasm/pruebaApp.git
   cd pruebaApp

2. Instala las dependencias del proyecto

npm install

3. Ejecuta la aplicación en el navegador (opcional para que cree la carpeta de angular (caché))

ionic serve

Ejecutar en Android Studio

1. Añadir la plataforma Android

ionic build
npx cap add android (genera la carpeta android)

2. Abrir en Android Studio

npx cap open android

Esto abrirá Android Studio con el proyecto nativo. Desde aquí puedes:

Ejecutar la app en un emulador o dispositivo real.

Generar el archivo APK

La APK se las comparto por el correo también para su revisión o prueba.
