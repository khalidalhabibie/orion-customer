import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!identifier.trim()) {
      setError("Enter your email or phone number.");
      return;
    }

    navigate("/wallet");
  }

  return (
    <main className="page auth-page">
      <section className="auth-panel">
        <p className="eyebrow">Customer access</p>
        <h1>Open your wallet</h1>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="identifier">Email or phone number</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              setError("");
            }}
            placeholder="you@example.com or 08123456789"
            aria-describedby={error ? "identifier-error" : undefined}
          />
          {error ? (
            <p className="form-error" id="identifier-error">
              {error}
            </p>
          ) : null}
          <button className="button auth-panel__submit" type="submit">
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
