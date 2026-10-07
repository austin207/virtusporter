import Seo from '@/seo/Seo';
import { breadcrumbs } from '@/seo/schema';
import { company } from '@/content/company';
import LegalLayout, { LegalContact } from '@/components/ox/LegalLayout';

const collected = [
  { label: 'Personal Information', desc: 'Name, email address, and contact information.' },
  { label: 'Account Information', desc: 'Username, password, and profile details.' },
  { label: 'Usage Data', desc: 'Information about how you use our website and services.' },
  { label: 'Device Information', desc: 'Information about your computer, browser, IP address, and other technical data.' },
];

const uses = [
  'Providing, maintaining, and improving our services',
  'Processing transactions and sending related information',
  'Sending administrative messages, updates, and security alerts',
  'Responding to your comments, questions, and requests',
  'Monitoring and analyzing trends, usage, and activities',
  'Personalizing and improving your experience on our website',
  'Complying with applicable laws, regulations, and legal processes',
];

const sharing = [
  'Service providers who perform services on our behalf',
  'Business partners with whom we jointly offer products or services',
  'Law enforcement or other governmental entities as required by law',
  'Other parties in connection with a company transaction, such as a merger, sale of company assets, or bankruptcy',
];

const rights = [
  'Access to personal information we hold about you',
  'Correction of inaccurate or incomplete information',
  'Deletion of your personal information',
  'Restriction or objection to our use of your information',
  'Portability of your information',
];

const PrivacyPolicy = () => (
  <>
    <Seo
      path="/privacy-policy"
      title="Privacy Policy"
      description="How VirtusCo collects, uses, shares and protects your personal information when you use our website and services."
      schema={[breadcrumbs([{ name: 'Privacy Policy', path: '/privacy-policy' }])]}
    />
    <LegalLayout
      title="Privacy Policy"
      updated="April 8, 2025"
      updatedIso="2025-04-08"
      intro="At VirtusCo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
    >
      <h2>Information We Collect</h2>
      <p>
        We collect information that you provide directly to us when you register for an account, contact us, or participate in any
        interactive features of our services. This may include:
      </p>
      <ul>
        {collected.map((c) => (
          <li key={c.label}>
            <strong className="font-sans font-medium text-ink">{c.label}</strong>: {c.desc}
          </li>
        ))}
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We may use the information we collect for various purposes, including:</p>
      <ul>
        {uses.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>

      <h2>Sharing Your Information</h2>
      <p>
        VirtusCo does not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as
        described in this Privacy Policy. We may share information with:
      </p>
      <ul>
        {sharing.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>

      <h2>Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. However, no method of
        transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>Your Rights</h2>
      <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
      <ul>
        {rights.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
      <p>To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.</p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date,
        and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy
        frequently to stay informed about how we are protecting your information.
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <LegalContact email={company.privacyEmail} />
    </LegalLayout>
  </>
);

export default PrivacyPolicy;
