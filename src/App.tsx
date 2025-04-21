import { useState } from 'react';
import axios from 'axios';
import { Actividad, Recurso, StudyPlanItem, StudyPlanResponse } from './types/study_plan';

interface Task {
  name: string;
  deadline: string;
  urgency: number;
}

interface Availability {
  [key: string]: number;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({ name: '', deadline: '', urgency: 3 });
  const [availability, setAvailability] = useState<Availability>({});
  const [habits, setHabits] = useState('early');
  const [response, setResponse] = useState<StudyPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    if (!newTask.name || !newTask.deadline) return;
    setTasks([...tasks, newTask]);
    setNewTask({ name: '', deadline: '', urgency: 3 });
  };

  const updateAvailability = (day: string, hours: number) => {
    setAvailability({ ...availability, [day]: hours });
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/generate-plan/', {
        tasks,
        availability,
        habits,
      });
      setResponse(res.data);
    } catch (err) {
      console.error('Error generating plan:', err);
      alert('Hubo un error generando el plan.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Study Planner</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Agregar Tarea</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Nombre de tarea"
            className="border p-2 flex-1"
            value={newTask.name}
            onChange={e => setNewTask({ ...newTask, name: e.target.value })}
          />
          <input
            type="date"
            className="border p-2"
            value={newTask.deadline}
            onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 w-20"
            min={1}
            max={5}
            value={newTask.urgency}
            onChange={e => setNewTask({ ...newTask, urgency: Number(e.target.value) })}
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded">
            Añadir
          </button>
        </div>

        <ul className="mt-4">
          {tasks.map((t, i) => (
            <li key={i} className="border-b py-1">
              {t.name} – {t.deadline} – Urgencia: {t.urgency}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Disponibilidad Semanal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {days.map(day => (
            <div key={day}>
              <label className="block text-sm">{day}</label>
              <input
                type="number"
                className="border w-full p-1"
                min={0}
                max={6}
                value={availability[day] || ''}
                onChange={e => updateAvailability(day, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Hábitos</h2>
        <select
          className="border p-2"
          value={habits}
          onChange={e => setHabits(e.target.value)}
        >
          <option value="early">Mañanero</option>
          <option value="night">Nocturno</option>
          <option value="balanced">Balanceado</option>
        </select>
      </div>

      <button
        onClick={generatePlan}
        className="bg-green-600 text-white px-6 py-2 rounded mb-6"
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar Plan'}
      </button>

      {response && (
        <div className="bg-gray-100 p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Plan Generado</h2>
          {response.study_plan.map((item: StudyPlanItem, i: number) => (
            <div key={i} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-bold mb-2">
                {item.task} <span className="text-sm text-gray-600">({item.mode})</span>
              </h3>

              {item.plan.actividades ? (
                item.plan.actividades.map((actividad: Actividad, idx: number) => (
                  <div key={idx} className="mb-3 bg-white border rounded p-4 shadow-sm">
                    <p className="font-semibold">{actividad.tipo}</p>
                    <p className="text-gray-700">{actividad.descripcion}</p>
                    <p className="text-sm text-gray-500 italic">
                      ⏱Tiempo estimado: {actividad.tiempo_estimado}
                    </p>

                    {Array.isArray(actividad.recursos) && actividad.recursos.length > 0 && (
                      <div className="mt-2">
                        <p className="font-semibold text-sm mb-1">Recursos:</p>
                        <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
                          {actividad.recursos.map((r: Recurso, j: number) => (
                            <li key={j}>
                              <a
                                href={r.link}
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                              >
                                {r.titulo} {r.autor ? `– ${r.autor}` : ''}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-red-600"> No se pudo analizar el plan para esta tarea.</p>
              )}
            </div>
      ))}
  </div>
)}

    </div>
  );
}
