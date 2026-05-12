
  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";
  import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_Dcviwdzrg',
      userPoolClientId: '24ajftj7bvbqdn6g7firk7seov',
    }
  }
});

  createRoot(document.getElementById("root")!).render(<App />);
  