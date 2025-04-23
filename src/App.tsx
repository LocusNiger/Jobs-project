import { useState } from "react";

interface Vacancy {
  title: string;
  company: string;
}

function App() {
  /* Para la carga de datos de la vacante */
  const [vacancy, setVacancy] = useState<Vacancy>({ title: "", company: "" });
  /* Arreglo de skills */
  const [skills, setSkills] = useState<string[]>([]);

  /* Para la carga de los datos de la vacante */
  const handleChargeVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    /* Acá quiero leer el valor del input 'vacancy' */
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const vacancy = formData.get("vacancy") as string;
    const company = formData.get("company") as string;
    /* Acá quiero agregar el valor del input 'vacancy' al objeto vacancy */
    if (vacancy && company) {
      setVacancy({ title: vacancy, company });
    }
    /* Acá quiero limpiar el input 'vacancy' */
    const inputVacancy = form.querySelector(
      'input[name="vacancy"]'
    ) as HTMLInputElement;
    const inputCompany = form.querySelector(
      'input[name="company"]'
    ) as HTMLInputElement;
    inputVacancy.value = "";
    inputCompany.value = "";
  };

  /* Para la carga de skills */
  const handleChargeSkill = (e: React.FormEvent) => {
    e.preventDefault();
    /* Acá quiero leer el valor del input 'skill' */
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const skill = formData.get("skill") as string;
    /* Acá quiero agregar el valor del input 'skill' al array de skills */
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
    /* Acá quiero limpiar el input 'skill' */
    const input = form.querySelector('input[name="skill"]') as HTMLInputElement;
    input.value = "";
    /* Acá quiero hacer un scroll hacia abajo */
    const container = document.querySelector(".flex-col") as HTMLDivElement;
    container.scrollIntoView({ behavior: "smooth" });
  };

  /* Para eliminar un skill */
  const handleDeleteSkill = (skill: string) => {
    /* Acá quiero eliminar el skill del array de skills */
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  /* Para eliminar todas las skills */
  const handleDeleteAllSkills = () => {
    /* Acá quiero eliminar todos los skills del array de skills */
    setSkills([]);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-500 gap-10">
      <h1 className="text-2xl font-bold text-white text-center">
        Descubrí qué skills se están solicitando en el mercado para poder
        potenciar tu perfil como desarrollador.
      </h1>
      <div className="flex items-start justify-center w-4/5 rounded-lg border border-white p-6 gap-4">
        <div className="flex flex-col items-center justify-center w-1/2 gap-4">
          <h2 className="text-xl font-bold text-white">Datos de la posición</h2>
          <form
            className="flex flex-col gap-4 w-full items-center justify-center"
            onSubmit={(e) => handleChargeVacancy(e)}
          >
            <input
              type="text"
              className="px-10 py-2 border border-gray-300 rounded-full text-center placeholder:text-gray-300 text-white focus:outline-none"
              placeholder="Nombre de la vacante"
              name="vacancy"
              required
            />
            <input
              type="text"
              className="px-10 py-2 border border-gray-300 rounded-full text-center placeholder:text-gray-300 text-white focus:outline-none"
              placeholder="Nombre de la empresa"
              name="company"
              required
            />
            <button
              className="border border-gray-300 rounded-full placeholder:text-gray-300 text-white font-bold py-2 px-4 hover:bg-gray-200 transition-all hover:text-black cursor-pointer"
              type="submit"
            >
              Cargar
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 gap-4">
          <p className="text-xl font-bold text-white">
            Cargá las skills de la vacante:
          </p>
          <form
            onSubmit={(e) => handleChargeSkill(e)}
            className="flex w-full gap-4 items-center justify-center"
          >
            <input
              type="text"
              className="px-10 py-2 border border-gray-300 rounded-full text-center placeholder:text-gray-300 text-white focus:outline-none"
              placeholder="Ej: React, Node.js, Python..."
              name="skill"
              required
            />
            <button
              className="border border-gray-300 rounded-full placeholder:text-gray-300 text-white font-bold py-2 px-4 hover:bg-gray-200 transition-all hover:text-black cursor-pointer"
              type="submit"
            >
              Cargar
            </button>
          </form>
          <div>
            {skills?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {vacancy && (
                  <p className="text-lg font-bold text-white">
                    Vacante: {vacancy?.title} - Empresa: {vacancy?.company}
                  </p>
                )}
                <p className="text-lg font-bold text-white">Skills cargadas:</p>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="group bg-white/20 text-white px-4 py-1 rounded-full border border-white/30 hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleDeleteAllSkills}
                  className="bg-red-500 text-white font-semibold rounded-3xl px-4 py-2 hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Eliminar todas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-white text-center absolute bottom-4 left-1/2 -translate-x-1/2">
        Hecho con <span className="text-red-600">♥</span> por{" "}
        <a
          href="https://www.github.com/LocusNiger"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 text-blue-100 transition-colors"
        >
          LocusNiger
        </a>
      </p>
    </div>
  );
}

export default App;
