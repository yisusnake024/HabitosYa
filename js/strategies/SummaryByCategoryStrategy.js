/**
 * PATRÓN STRATEGY: Estrategia Concreta 2
 * Agrupa y cuenta los cumplimientos por categoría (salud, productividad, etc.)
 */
class SummaryByCategoryStrategy extends SummaryStrategy {
    generateSummary(habits) {
        const summary = {
            'salud': 0,
            'productividad': 0,
            'aprendizaje': 0,
            'otros': 0
        };
        
        habits.forEach(habit => {
            if (summary[habit.category] !== undefined) {
                summary[habit.category] += 1;
            } else {
                summary['otros'] = (summary['otros'] || 0) + 1;
            }
        });

        // Retornamos un arreglo de objetos filtrando los que tienen 0 (opcional, aquí enviamos todos)
        return Object.keys(summary).map(key => ({
            label: key,
            value: summary[key],
            cssClass: `cat-${key}`
        }));
    }
}
