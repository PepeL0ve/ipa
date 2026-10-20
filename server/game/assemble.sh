#!/bin/sh
# part2.js = head.js (сеть/подпись) + старые иконки/аватары + значки 047/007 + звуки + ui_a.js + ui_b.js
cd "$(dirname "$0")" || exit 1
{ cat head.js assets/old_icons.js assets/old_sbj.js assets/old_audio.js
  printf '\nconst px=()=>Math.min(window.devicePixelRatio||1,3);\n'
  cat assets/old_badges2.js ui_a.js ui_b.js; } > part2.js
