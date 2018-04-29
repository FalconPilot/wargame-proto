npm run build
rm build/service-worker.js
rm -r ../backend/priv/build
cp -r build ../backend/priv/build
