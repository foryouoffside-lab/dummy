import Link from 'next/link';

const LAST_UPDATED = 'August 22, 2026';

export const metadata = {
  title: 'Privacy Policy - SkillDrills',
  description: 'How SkillDrills collects, uses, and protects your data on skilldrills.online and in the SkillDrills mobile app.',
  alternates: { canonical: 'https://skilldrills.online/privacy' },
  robots: { index: true, follow: true },
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-[15px] font-bold text-white mb-2.5">{title}</h2>
      <div className="text-[13px] text-slate-400 leading-relaxed space-y-2.5">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[100dvh] bg-[#050508] text-slate-100 px-5 pb-16" style={{ paddingTop: 'calc(24px + env(safe-area-inset-top))' }}>
      <div className="max-w-[640px] mx-auto">
        <Link href="/" className="text-[12px] text-violet-400 font-semibold">&larr; Back to SkillDrills</Link>

        <h1 className="text-[26px] font-black text-white mt-5 mb-1">Privacy Policy</h1>
        <p className="text-[12px] text-slate-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <Section title="Overview">
          <p>SkillDrills ("we", "us") provides free training drills at skilldrills.online and a companion SkillDrills mobile app. This policy explains what information we collect across the website and the app, why we collect it, and how you can control or delete it.</p>
        </Section>

        <Section title="Information we collect">
          <p><strong className="text-slate-300">Using our website.</strong> You can use skilldrills.online and play drills without creating an account. We use Vercel Analytics and Speed Insights to understand traffic and page performance — these are cookie-less and don't collect personally identifiable information.</p>
          <p><strong className="text-slate-300">Account information (mobile app).</strong> Signing in to the SkillDrills app requires a Google account. We receive your name, email address, and profile photo from Google Sign-In to create your player profile.</p>
          <p><strong className="text-slate-300">Gameplay data (mobile app).</strong> Drill scores, streaks, XP/level progress, and daily challenge history are stored against your account so your progress is saved and can sync across sessions.</p>
          <p><strong className="text-slate-300">Diagnostic data (mobile app).</strong> We use Firebase Crashlytics to automatically collect crash reports and basic device information (device model, OS version, app version) so we can find and fix bugs. This data is not linked to your name or used for advertising.</p>
          <p><strong className="text-slate-300">Usage analytics (mobile app).</strong> The app uses Firebase Analytics to understand which drills and features are actually used — screen views and events like completing a drill (drill, category, score). It doesn't use cookies or track you across other websites or apps, and isn't used for advertising.</p>
          <p><strong className="text-slate-300">Device preferences (mobile app).</strong> Settings like sound on/off are stored locally on your device only and are never sent to us.</p>
        </Section>

        <Section title="How we use this information">
          <p>To operate the website and app, save and display your progress, personalize daily challenges, keep things working correctly, and diagnose bugs and performance issues. We do not run ads and we do not sell your personal information to anyone.</p>
        </Section>

        <Section title="Who we share data with">
          <p>The app's data is stored using Firebase (Google Cloud) as our backend infrastructure provider, and diagnostic/usage data is processed by Firebase Crashlytics and Firebase Analytics as described above. The website's traffic and performance data is processed by Vercel. These providers process data on our behalf under their own security and data-processing terms — we do not sell or share your data with anyone else, including advertisers.</p>
        </Section>

        <Section title="What other players can see">
          <p>If you use the mobile app's leaderboards and Arena, your <strong className="text-slate-300">display name and profile photo are visible to other players</strong> — that is how rankings and match-ups work. Your email address is never shown to other players and is not stored on your public player profile. If you would rather not be identifiable, choose a display name and photo that don't identify you personally.</p>
        </Section>

        <Section title="Data retention & deletion">
          <p>We keep your app account data for as long as your account exists. You can permanently delete your account and all associated data at any time from <span className="text-slate-300">Progress → Delete Account &amp; Wipe Data</span> inside the app. If you no longer have the app installed, email <span className="text-slate-300">skilldrills.contact@gmail.com</span> from the address associated with your account and we'll delete your data within 30 days. Full instructions are on our <Link href="/delete-account" className="text-violet-400">account deletion page</Link>.</p>
        </Section>

        <Section title="Children's privacy">
          <p>SkillDrills is not directed at children under 13, and creating an app account requires a Google account. If we become aware that we've collected information from a child under 13 without appropriate consent, we will delete it — contact us below to request this.</p>
        </Section>

        <Section title="Who is responsible for your data">
          <p>SkillDrills is operated by Sangmesh, based in India, acting as the data controller for the information described in this policy. You can reach us at <span className="text-slate-300">skilldrills.contact@gmail.com</span> for anything relating to your data.</p>
        </Section>

        <Section title="Why we are allowed to process your data (EEA & UK)">
          <p>If you are in the European Economic Area or the United Kingdom, the GDPR requires us to name a lawful basis for each use of your data:</p>
          <p><strong className="text-slate-300">Performance of a contract.</strong> Your account information, player profile, and gameplay progress are processed so we can actually provide the service you signed up for — saving your scores, ranking you, and matching you against other players.</p>
          <p><strong className="text-slate-300">Legitimate interests.</strong> Crash reports, app usage analytics, and the website's cookie-less traffic and performance measurement are processed so we can keep the website and app working, fix bugs, and understand which drills people use. We have weighed this against your privacy: the data is not linked to your name and is never used for advertising or profiling.</p>
          <p><strong className="text-slate-300">Consent.</strong> Where consent is required for analytics in your country, we rely on the consent you give at that point, and you can withdraw it at any time.</p>
        </Section>

        <Section title="Your rights over your data">
          <p>Wherever you live, you can ask us to: give you a copy of your data, correct anything wrong, delete your account and its data, export your data in a portable format, restrict or object to how we process it, or withdraw consent you previously gave.</p>
          <p>The fastest route for deletion is <span className="text-slate-300">Progress &rarr; Delete Account &amp; Wipe Data</span> inside the app, or see our <Link href="/delete-account" className="text-violet-400">account deletion page</Link>. For anything else, email <span className="text-slate-300">skilldrills.contact@gmail.com</span> and we will respond within 30 days. We will never charge you or degrade your experience for exercising these rights.</p>
          <p>If you are in the EEA or UK and think we have handled your data wrongly, you also have the right to complain to your local data protection authority.</p>
        </Section>

        <Section title="California residents">
          <p>Under the CCPA/CPRA, the categories of personal information we collect are identifiers (name, email address, profile photo, account ID) and internet or app activity (gameplay events, crash and usage diagnostics, and cookie-less website traffic measurement). We collect these for the purposes described above.</p>
          <p><strong className="text-slate-300">We do not sell or share your personal information</strong>, and we never have. We do not use it for cross-context behavioural advertising, and we do not knowingly collect it from anyone under 16.</p>
          <p>You have the right to know what we hold, to delete it, to correct it, and not to be discriminated against for asking. Use the same routes described above.</p>
        </Section>

        <Section title="Where your data is stored">
          <p>The app runs on Firebase (Google Cloud) and the website is hosted by Vercel. Your data may be stored and processed on servers outside your own country, including in the United States. Where data leaves the EEA or UK, our providers&apos; standard data protection terms and Standard Contractual Clauses cover that transfer.</p>
        </Section>

        <Section title="Security">
          <p>App sign-in is handled entirely by Google — we never see or store your password. Your data is protected using Firebase's standard authentication and access-control rules.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>If this policy changes, we'll update the date at the top of this page. Continued use of SkillDrills after a change means you accept the updated policy.</p>
        </Section>

        <Section title="Contact us">
          <p>Questions about this policy or your data? Email <span className="text-violet-400">skilldrills.contact@gmail.com</span>.</p>
        </Section>

        <p className="text-[11px] text-slate-600 mt-10">
          See also our <Link href="/terms" className="text-violet-400">Terms of Service</Link> and <Link href="/delete-account" className="text-violet-400">account deletion page</Link>.
        </p>
      </div>
    </div>
  );
}
