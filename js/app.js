/**
 * PUNTO DE ENTRADA (Entry Point)
 * Aquí ensamblamos todas las capas y patrones arquitectónicos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Adapter y Base de Datos (Singleton)
    const storageAdapter = new StorageAdapter('habitos_ya_db');
    const repository = new HabitRepository(storageAdapter);

    // 2. Servicio (Lógica de Negocio y Subject)
    const service = new HabitService(repository);

    // 3. Vista y Controlador (MVC)
    const view = new HabitView();
    const app = new HabitController(service, view);
    
    // A este punto, el Controlador ya conectó la Vista con el Servicio y
    // forzó el primer renderizado llamando a notifyStateChanged().
});
