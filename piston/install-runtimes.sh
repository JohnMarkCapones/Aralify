#!/bin/bash
# Install language runtimes into the Piston container.
# Run this after `docker compose up -d` and the container is healthy.
#
# Usage: bash install-runtimes.sh

set -e

PISTON_URL="http://localhost:2000"

echo "Waiting for Piston API to be ready..."
until curl -s "$PISTON_URL/api/v2/runtimes" > /dev/null 2>&1; do
  sleep 2
  echo "  ...still waiting"
done
echo "Piston API is up!"

install_runtime() {
  local lang=$1
  local version=$2
  echo "Installing $lang $version..."
  curl -s -X POST "$PISTON_URL/api/v2/packages" \
    -H "Content-Type: application/json" \
    -d "{\"language\":\"$lang\",\"version\":\"$version\"}" \
    | echo "  Done: $lang $version"
}

install_runtime "python"     "3.10.0"
install_runtime "node"       "15.10.0"
install_runtime "java"       "15.0.2"
install_runtime "typescript" "4.2.3"
install_runtime "gcc"        "10.2.0"
install_runtime "g++"        "10.2.0"

echo ""
echo "All runtimes installed! Verify with:"
echo "  curl http://localhost:2000/api/v2/runtimes"
