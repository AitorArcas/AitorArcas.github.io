---
title: "Editor de vídeo automático con agentes de IA locales"
description: "Pipeline que recibe un vídeo en bruto, lo transcribe, deja que un modelo local decida qué cortar y monta el resultado en DaVinci Resolve con subtítulos, listo para revisar."
date: 2026-11-07
tags: ["Python", "OpenCode", "LM Studio", "Whisper", "MCP", "DaVinci Resolve"]
---

## El problema

Editar a mano vídeos verticales hablados es lento y repetitivo: hay que
localizar tomas falsas, repeticiones, dudas, muletillas y pausas largas,
cortarlas una a una y después subtitular. Quería que ese primer pase de
edición lo hiciera un sistema y quedarme yo solo con la revisión final.

## Cómo funciona

<iframe src="/media/editor-video-agentes/animacion.html" title="Animación del flujo del editor de vídeo" loading="lazy" sandbox="allow-scripts" style="width:100%;  aspect-ratio:16/9;border:0;border-radius:8px"></iframe>

Basta con soltar un vídeo en una carpeta. A partir de ahí:

- Un script en Python (`watcher.py`) vigila la carpeta y detecta archivos
  nuevos en `.mp4`, `.mov`, `.mkv` y `.mts`.
- Otro agente (`transcribe.py`) transcribe el audio con Whisper en español.
- Un modelo local (Qwen3.5, ejecutado con LM Studio y orquestado con
  OpenCode) lee la transcripción y decide qué segmentos conservar y cuáles
  eliminar. Cada corte queda registrado con su motivo en
  `editor_decisiones.json`, de modo que se puede auditar por qué el modelo
  decidió lo que decidió.
- A través de un servidor MCP de la comunidad para DaVinci Resolve, el
  sistema crea un proyecto nuevo, monta los cortes respetando los fps y la
  resolución del clip original y añade los subtítulos automáticos.
- Resolve renderiza el resultado en MP4 (H.264) con los subtítulos grabados
  en el vídeo y lo deja todo en una carpeta `revisar`, junto con un archivo
  `.srt` de respaldo listo para publicar.

## Decisiones técnicas

- **Modelo local en vez de una API:** no tiene coste y el material en bruto
  no sale de mi equipo.
- **Salida del modelo en JSON con esquema estricto y validación**, para que
  una respuesta mal formada no rompa el montaje.
- **Fallback conservador:** si el modelo falla tres veces, se conserva todo
  el material en lugar de interrumpir el proceso.
- **Límite del 70 % de recorte**, como protección frente a un modelo
  demasiado agresivo.
- **Procesamiento por lotes con detección de archivo estable**, para no
  empezar a procesar un vídeo que todavía se está copiando.

## Qué aprendí

Aprendí a manejar el servidor MCP de la comunidad para DaVinci Resolve, a
conectar OpenCode con Resolve y a reconectar LM Studio con OpenCode cuando
hizo falta. Lo que más me sorprendió fue verlo funcionar de principio a
fin sin tocar nada: abre Resolve, crea el proyecto, edita, exporta, aparta
el vídeo en bruto de la carpeta de entrada y deja el resultado en otra
carpeta para que yo lo revise.

## Sobre el código

El proyecto no está publicado, porque es una herramienta de uso personal. Si
te interesa verlo, escríbeme y te doy acceso a un repositorio privado.
