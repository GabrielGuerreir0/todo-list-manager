// __mocks__/importMetaMock.js
global.import = {
  meta: {
    env: {
      VITE_FIREBASE_API_KEY: "mock_api_key",
      VITE_FIREBASE_AUTH_DOMAIN: "mock_auth_domain",
      VITE_FIREBASE_PROJECT_ID: "mock_project_id",
      VITE_FIREBASE_STORAGE_BUCKET: "mock_storage_bucket",
      VITE_FIREBASE_MESSAGING_SENDER_ID: "mock_messaging_sender_id",
      VITE_FIREBASE_APP_ID: "mock_app_id",
      VITE_FIREBASE_MEASUREMENT_ID: "mock_measurement_id",
    },
  },
};
