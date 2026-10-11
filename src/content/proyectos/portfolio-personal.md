---
title: "Portfolio personal con Astro"
description: "Este mismo sitio: diseñado y construido paso a paso junto a una IA, pensado desde el principio para ser fácil de escalar con nuevos proyectos."
date: 2026-09-26
tags: ["Astro", "Tailwind CSS", "TypeScript"]
repoUrl: "https://github.com/AitorArcas/AitorArcas.github.io"
---

## El problema

Necesitaba un portfolio que no se quedara obsoleto a las dos semanas de
publicarlo. La mayoría de plantillas que veía obligaban a tocar HTML y CSS
repartido por varios archivos cada vez que quería añadir un proyecto nuevo.

## Cómo lo resolví

Usé Astro con Content Collections: cada proyecto es un archivo Markdown con
una estructura fija (título, descripción, tecnologías, fecha). Añadir un
proyecto nuevo es crear un archivo así, sin tocar ni una línea de código de
las páginas o componentes.

El diseño está construido sobre un sistema de tokens en CSS (colores,
tipografía, espaciados) para que cambiar el aspecto visual del sitio entero
sea cuestión de tocar un puñado de variables, no de rehacer cada página.

## Qué aprendí

A pensar la arquitectura de un proyecto antes de escribir la primera línea
de código, y a valorar herramientas (como las Content Collections de Astro)
diseñadas específicamente para resolver el problema de "contenido que
crece con el tiempo".
