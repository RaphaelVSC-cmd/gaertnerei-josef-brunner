#!/bin/bash
echo "Starte Gärtnerei Josef Brunner Website..."
if which xdg-open > /dev/null
then
  xdg-open index.html
elif which open > /dev/null
then
  open index.html
else
  echo "Bitte öffnen Sie index.html manuell im Browser."
fi
