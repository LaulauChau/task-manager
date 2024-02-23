#!/bin/sh

# Run Prisma migration
echo "Running Prisma migration..."
pnpm dlx prisma db push

# Start the Node.js application
echo "Starting Node.js application..."
exec node dist/main.js
