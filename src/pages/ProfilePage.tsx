export function ProfilePage() {
  return (
    <main className="page profile-page app-page">
      <section className="page-heading">
        <p className="eyebrow">Profile</p>
        <h1>Your loyalty profile</h1>
        <p>Manage your customer identity when account settings are connected.</p>
      </section>

      <section className="profile-card">
        <div className="profile-avatar" aria-hidden="true">
          OV
        </div>
        <div>
          <p className="profile-card__label">Signed in as</p>
          <h2>Customer Guest</h2>
          <p>Mock customer account</p>
        </div>
      </section>
    </main>
  );
}
