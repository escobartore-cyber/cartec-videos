#!/usr/bin/env bash
# Convierte una secuencia PNG con transparencia (remotion render --sequence) en dos
# H.264 ligeros para Premiere: relleno (color) y mate (alfa en luminancia).
# En Premiere: relleno en V2, mate en V3 con el ojo apagado y, en el relleno,
# efecto «Mate de seguimiento» (Track Matte Key) → Mate: Vídeo 3 · Composición: Luma.
# Uso: scripts/alpha-pair.sh carpeta-secuencia salida/PREFIJO [fps]
set -euo pipefail
SEQ=$1; OUT=$2; FPS=${3:-30}
P=$(ls "$SEQ" | head -1 | sed 's/[0-9]\+\.png$//')
N=$(ls "$SEQ" | head -1 | sed -E 's/^.*[^0-9]([0-9]+)\.png$/\1/' | tr -d '\n' | wc -c)
IN="$SEQ/${P}%0${N}d.png"
ffmpeg -v error -y -framerate "$FPS" -start_number 0 -i "$IN" -vf "format=yuv420p" \
  -c:v libx264 -preset slow -crf 14 -tune animation -movflags +faststart "${OUT}_RELLENO.mp4" &
ffmpeg -v error -y -framerate "$FPS" -start_number 0 -i "$IN" -vf "alphaextract,format=yuv420p" \
  -c:v libx264 -preset slow -crf 12 -movflags +faststart "${OUT}_MATE.mp4" &
wait
ls -la "${OUT}_RELLENO.mp4" "${OUT}_MATE.mp4"
