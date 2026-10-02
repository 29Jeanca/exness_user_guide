# Trader Guide — Exness + MetaTrader 5

Guía web educativa construida en React + Vite para aprender la **vista de trader** de Exness usando MetaTrader 5 Desktop como referencia.

## Qué incluye

- Mapa visual del terminal MT5: Observación de mercado, Bid/Ask, gráfico, temporalidades y pestaña Operaciones.
- Lectura de velas y estructura de mercado.
- Movimientos comunes: tendencia, rango, breakout, retest, falso breakout y picos de volatilidad.
- “Jugadas” o setups explicados como escenarios educativos, no como señales.
- Flujo completo para abrir una operación: símbolo, volumen, SL, TP, órdenes de mercado y pendientes.
- Gestión y cierre de posiciones.
- Simulador educativo de R:R y riesgo monetario.
- Checklist completo de preparación → ejecución → revisión.
- Glosario buscable de términos de trading/MT5.
- Biblioteca base con referencias a libros reconocidos de trading y documentación oficial.
- Progreso de módulos guardado en `localStorage`.
- Diseño responsive para desktop, tablet y móvil.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Fuentes principales

La guía prioriza documentación oficial para comportamiento de plataforma y ejecución:

- Exness Help Center — MT5 Trading Guide (Desktop)
- Exness Help Center — Setting Stop Loss and Take Profit
- Exness Help Center — Closing Orders
- MetaTrader 5 Help

Para teoría y principios de trading se tomaron como referencia, entre otros:

- *Trading in the Zone* — Mark Douglas
- *Japanese Candlestick Charting Techniques* — Steve Nison
- *Technical Analysis of the Financial Markets* — John J. Murphy
- *Market Wizards* — Jack D. Schwager
- *The New Trading for a Living* — Alexander Elder

Las ideas se resumen y reformulan con fines educativos; el proyecto no reproduce capítulos ni contenido extenso de las obras.

## Aviso

Este proyecto es educativo. No genera señales, no recomienda operaciones y no sustituye asesoría financiera. El trading con productos apalancados implica riesgo de pérdida. Verifica siempre las condiciones actuales del instrumento y de tu cuenta en Exness/MT5.
