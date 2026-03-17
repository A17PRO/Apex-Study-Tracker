import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import NavBar from './components/NavBar';
import FloatingTimer from './components/FloatingTimer';
import TimerView from './Views/TimerView';
import TasksView from './Views/TaskView';
import AnalyticsView from './Views/AnalyticsView';
import AmbientView from './Views/AmbientView';
import SettingsView from './Views/SettingsView';
import { INITIAL_TASKS, DEFAULT_SETTINGS } from './data/constants';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [view, setView] = useState('timer');
  const [tasks, setTasks] = useLocalStorage('apex_tasks', INITIAL_TASKS);
  const [settings, setSettings] = useLocalStorage('apex_settings', DEFAULT_SETTINGS);

  const views = [
    { id: 'timer', component: <TimerView tasks={tasks} setTasks={setTasks} settings={settings} /> },
    { id: 'tasks', component: <TasksView tasks={tasks} setTasks={setTasks} /> },
    { id: 'analytics', component: <AnalyticsView tasks={tasks} /> },
    { id: 'ambient', component: <AmbientView /> },
    { id: 'settings', component: <SettingsView settings={settings} setSettings={setSettings} /> }
  ];

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      overflow: 'hidden', position: 'relative', background: '#07090f',
      color: '#ffffff'
    }}>
      {settings.particles !== false && <ParticleBackground />}

      <FloatingTimer currentView={view} />
      <NavBar view={view} setView={setView} />

      <main style={{
        flex: 1, display: 'flex', overflow: 'hidden',
        zIndex: 10, minWidth: 0, position: 'relative'
      }}>
        {views.map((v) => (
          <div
            key={v.id}
            style={{
              display: view === v.id ? 'contents' : 'none',
              height: '100%', width: '100%'
            }}
          >
            {v.component}
          </div>
        ))}
      </main>
    </div>
  );
}