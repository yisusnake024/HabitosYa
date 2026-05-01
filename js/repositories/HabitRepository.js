/**
 * PATRÓN REPOSITORY & SINGLETON
 * Abstrae el acceso a los datos utilizando el adaptador.
 * Se asegura de que solo exista una instancia del repositorio (Singleton)
 * para evitar estados inconsistentes en la gestión de datos en memoria/disco.
 */
class HabitRepository {
    constructor(storageAdapter) {
        if (HabitRepository.instance) {
            return HabitRepository.instance;
        }
        
        this.adapter = storageAdapter;
        this.habits = this.adapter.load(); // Carga inicial
        
        HabitRepository.instance = this;
    }

    getAll() {
        return this.habits;
    }

    add(habitDTO) {
        this.habits.push(habitDTO);
        this.save();
    }

    remove(id) {
        this.habits = this.habits.filter(habit => habit.id !== id);
        this.save();
    }

    count() {
        return this.habits.length;
    }

    save() {
        this.adapter.save(this.habits);
    }
}
