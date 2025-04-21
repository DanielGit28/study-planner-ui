# 💻 Study Planner Frontend (React + Vite + TailwindCSS + TypeScript)

Interfaz web para generar y visualizar planes de estudio personalizados con ayuda de inteligencia artificial.

---

## 🧰 Tecnologías

- React 18
- Vite
- Tailwind CSS
- TypeScript
- Axios

---

## ⚙️ Instalación

1. **Instala dependencias**:

```bash
npm install
```

2. **Corre el servidor de desarrollo**:

```bash
npm run dev
```

Por defecto:  
`http://localhost:5173`

---

## 🌐 Configuración

Asegúrate de que el backend esté corriendo en `http://localhost:8000`.

Si tu backend tiene otro puerto o está en la nube, actualiza la URL en el `axios` del frontend:

```ts
axios.post("http://localhost:8000/api/generate-plan", data)
```

---

## 📚 ¿Qué hace el frontend?

- Permite ingresar tareas, fechas límite y disponibilidad
- Llama al backend para obtener un plan de estudio con IA
- Muestra actividades detalladas en tarjetas con recursos clicables
- UI responsiva, limpia y fácil de usar

---

## 📌 Estado actual

✅ Backend funcional con IA  
✅ Frontend con vista clara y usable  
🔜 Próximas mejoras: integración con calendario, exportar PDF, login de usuario

---