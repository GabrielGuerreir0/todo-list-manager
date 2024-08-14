// __mocks__/firebase.js
export const initializeApp = jest.fn(() => ({
  // Mock dos métodos e propriedades necessários
}));

export const getAuth = jest.fn(() => ({
  // Mock dos métodos e propriedades necessários
}));

export const getAnalytics = jest.fn(() => ({
  // Mock dos métodos e propriedades necessários
}));

export const firebaseConfig = {
  apiKey: "mock_api_key",
  authDomain: "mock_auth_domain",
  projectId: "mock_project_id",
  storageBucket: "mock_storage_bucket",
  messagingSenderId: "mock_messaging_sender_id",
  appId: "mock_app_id",
  measurementId: "mock_measurement_id",
};
