echo $DATABASE_URL
yarn prisma generate
yarn prisma migrate deploy
node seed.cjs