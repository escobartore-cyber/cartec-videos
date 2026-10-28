#!/usr/bin/env bash
# Entrega final para Reels / TikTok / Shorts a partir del máster de Remotion.
# Uso: scripts/deliver.sh <master.mp4> <mezcla.wav> <salida.mp4>
#
# Máster: render de Remotion con fotogramas PNG, H.264 4:4:4 CRF 1 y sin audio:
#   npx remotion render src/index.ts EP01 out/master.mp4 --image-format=png --codec=h264 \
#     --crf=1 --pixel-format=yuv444p --muted --concurrency=4
# Entrega: H.264 High 4.2, 4:2:0, BT.709, 30 fps, GOP de 1 s, CRF 16 (tope 18 Mb/s: < 100 MB por minuto
# de vídeo, límite de archivo de GitHub; las plataformas recomprimen muy por debajo),
# AAC 320 kb/s a 48 kHz desde la mezcla WAV (una sola compresión de audio), faststart.
set -euo pipefail
master="$1"; mix="$2"; out="$3"
mkdir -p "$(dirname "$out")"
ffmpeg -v error -stats -y -i "$master" -i "$mix" -map 0:v -map 1:a \
  -c:v libx264 -preset veryslow -tune animation -crf 16 -maxrate 18M -bufsize 36M \
  -profile:v high -level 4.2 -pix_fmt yuv420p -r 30 -g 30 -keyint_min 30 -bf 2 \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
  -c:a aac -b:a 320k -ar 48000 -ac 2 -shortest -movflags +faststart "$out"
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,color_space -of default=nw=1 "$out"
