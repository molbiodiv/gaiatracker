until node gaiatracker.js; do
    echo "GAIATRACKER crashed with exit code $?.  Respawning.." >&2
    sleep 1
done