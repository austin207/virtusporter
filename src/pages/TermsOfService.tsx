import { Link } from 'react-router-dom';
import Seo from '@/seo/Seo';
import { breadcrumbs } from '@/seo/schema';
import { company } from '@/content/company';
import LegalLayout, { LegalContact } from '@/components/ox/LegalLayout';

const sections: { title: string; content: string[] }[] = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using the Services, you agree to these Terms and our Privacy Policy, which is incorporated by reference. We may update these Terms from time to time. If we make significant changes, we will provide notice, such as by sending an email or displaying a notice within our Services.',
    ],
  },
  {
    title: '2. Using Our Services',
    content: [
      'You must follow any policies made available to you within the Services. You may not misuse our Services. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.',
      'Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law.',
    ],
  },
  {
    title: '3. Your Account',
    content: [
      'You may need to create an account to use some of our Services. You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your account.',
      'We encourage you to use a strong password (using a combination of upper and lower case letters, numbers, and symbols) with your account.',
    ],
  },
];

const sectionsAfter: { title: string; content: string[] }[] = [
  {
    title: '5. Modifying and Terminating our Services',
    content: [
      'We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.',
      'You can stop using our Services at any time. We may also stop providing Services to you, or add or create new limits to our Services at any time.',
    ],
  },
  {
    title: '6. Liability for our Services',
    content: [
      'TO THE EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      'TO THE EXTENT PERMITTED BY LAW, VIRTUSCO WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, OR DATA) ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES, HOWEVER CAUSED, WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE.',
    ],
  },
  {
    title: '7. Business uses of our Services',
    content: [
      'If you are using our Services on behalf of a business, that business accepts these terms. It will hold harmless and indemnify VirtusCo and its affiliates, officers, agents, and employees from any claim, suit or action arising from or related to the use of the Services.',
    ],
  },
  {
    title: '8. About these Terms',
    content: [
      "We may modify these Terms to, for example, reflect changes to the law or changes to our Services. You should look at the Terms regularly. We'll post notice of modifications to these Terms on this page.",
      'If you do not agree to the modified Terms, you should discontinue your use of the Services.',
    ],
  },
];

const Block = ({ s }: { s: { title: string; content: string[] } }) => (
  <>
    <h2>{s.title}</h2>
    {s.content.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
  </>
);

const TermsOfService = () => (
  <>
    <Seo
      path="/terms-of-service"
      title="Terms of Service"
      description="The terms that govern your access to and use of VirtusCo's website, products, services and applications."
      schema={[breadcrumbs([{ name: 'Terms of Service', path: '/terms-of-service' }])]}
    />
    <LegalLayout
      title="Terms of Service"
      updated="April 8, 2025"
      updatedIso="2025-04-08"
      intro={`These Terms of Service ("Terms") govern your access to and use of VirtusCo's website, products, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.`}
    >
      <aside className="my-10 border border-ink/15 bg-card p-6">
        <p className="eyebrow mb-3 !font-mono !text-[0.72rem] !text-accent-ink">Important Notice</p>
        <p>
          By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If
          you do not agree to these Terms, please do not access or use our Services.
        </p>
      </aside>

      {sections.map((s) => (
        <Block key={s.title} s={s} />
      ))}

      <h2>4. Privacy and Copyright Protection</h2>
      <p>
        Our <Link to="/privacy-policy">Privacy Policy</Link> explains how we treat your personal data and protect your privacy when you use
        our Services. By using our Services, you agree that we can use such data in accordance with our Privacy Policy.
      </p>
      <p>We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to applicable laws.</p>

      {sectionsAfter.map((s) => (
        <Block key={s.title} s={s} />
      ))}

      <h2>9. Contact Information</h2>
      <p>If you have any questions about these Terms or our Services, please contact us at:</p>
      <LegalContact email={company.legalEmail} />
    </LegalLayout>
  </>
);

export default TermsOfService;
