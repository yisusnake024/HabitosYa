/**
 * PATRÓN STRATEGY: Estrategia Concreta 1
 * Agrupa y cuenta los cumplimientos por el nombre exacto del hábito.
 */
class SummaryByHabitStrategy extends SummaryStrategy {
    generateSummary(habits) {
        const summary = {};
        
        habits.forEach(habit => {
            if (!summary[habit.name]) {
                summary[habit.name] = { count: 0, classCategory: habit.category };
            }
            summary[habit.name].count += 1;
        });

        // Retornamos un arreglo de objetos para facilitar el renderizado
        return Object.keys(summary).map(key => ({
            label: key,
            value: summary[key].count,
            cssClass: `cat-${summary[key].classCategory}`
        }));
    }
}
