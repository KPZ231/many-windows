import Onboarding from './pages/Onboarding';
import { invoke } from "@tauri-apps/api/core";

import "./App.css";

function App() {
  async function floating() {
    await invoke("floating");
  }

  return (
    <main className="flex items-center ">
      <div className='flex flex-row items-center justify-center content-center m-auto'>
        <Onboarding />

      </div>
    </main>
  );
}

export default App;
