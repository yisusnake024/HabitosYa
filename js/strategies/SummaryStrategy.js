/**
 * PATRÓN STRATEGY: Interfaz de la Estrategia (Interface Strategy)
 * Define la estructura que deben tener todas las estrategias de resumen.
 */
class SummaryStrategy {
    generateSummary(habits) {
        throw new Error("El método generateSummary debe ser implementado por una subclase.");
    }
}
