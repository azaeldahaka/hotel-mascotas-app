# ADR-003: Separación Física, Acústica y Visual Estricta entre Especies

## Estado
Aprobado e Implementado

## Contexto
El bienestar y la reducción del cortisol en gatos y perros exige evitar todo contacto visual, olores directos o ladridos continuos cerca del sector felino. Muchas guarderías tradicionales fallan comercialmente porque los dueños de gatos no quieren dejarlos en lugares donde escuchan perros ladrando.

## Decisión
Se modela la arquitectura de software y el inventario físico con **aislamiento estricto por especie**:
* **10 Cápsulas Caninas (C-01 a C-10):** Vinculadas al patio recreativo y piscina.
* **6 Torres Felinas (F-01 a F-06):** Ubicadas en el sector zen acústicamente sellado, con torres verticales, repisas escalonadas y difusores de feromonas Feliway.
* **En el Software:** El switch de especie es de primer orden en el Header y en el motor de reservas, impidiendo cualquier cruce accidental de alojamiento.

## Consecuencias
* **Positivas:** Máxima confianza de los tutores de gatos y tranquilidad de los perros; propuesta de valor diferencial frente a la competencia de guarderías en Salta.
* **Negativas:** La capacidad no es elástica (no se puede usar una cápsula de perro para un gato sin desinfección profunda y viceversa).
