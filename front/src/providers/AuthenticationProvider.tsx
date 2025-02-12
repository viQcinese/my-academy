import { Auth0Provider } from "@auth0/auth0-react";

type Props = {
  children?: React.ReactNode;
};

export function AuthenticationProvider(props: Props) {
  const { children } = props;

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_PROVIDER_DOMAIN!}
      clientId={import.meta.env.VITE_AUTH_PROVIDER_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH_PROVIDER_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
