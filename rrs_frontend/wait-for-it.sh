#!/bin/bash
# Script to wait for a TCP service to become available

# Set default values for parameters
host="localhost"
port="3306"
timeout=30

# Parse command line options
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -h|--host)
            host="$2"
            shift
            shift
            ;;
        -p|--port)
            port="$2"
            shift
            shift
            ;;
        -t|--timeout)
            timeout="$2"
            shift
            shift
            ;;
        *)
            echo "Unknown option: $key"
            exit 1
            ;;
    esac
done

echo "Waiting for $host:$port to become available..."

# Wait until the service is reachable or until timeout
timeout "$timeout" bash -c "\
    until nc -z $host $port; do \
        sleep 1; \
    done \
" || exit 1

echo "$host:$port is now available!"
