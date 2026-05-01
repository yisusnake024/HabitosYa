/**
 * PATRÓN FACTORY METHOD
 * Encapsula la creación de objetos Habit. Útil si las diferentes categorías
 * de hábitos necesitan inicializaciones distintas en el futuro.
 */
class HabitFactory {
    static createHabit(name, category, date) {
        // Generar un ID simple basado en timestamp
        const id = 'habit_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        
        // Aquí podríamos retornar diferentes subclases de Habit dependiendo de la categoría,
        // pero por simplicidad retornamos la misma entidad validada.
        const newHabit = new Habit(id, name, category, date);
        
        if (!newHabit.isValid()) {
            throw new Error("Datos de hábito inválidos");
        }
        
        return newHabit;
    }
}
