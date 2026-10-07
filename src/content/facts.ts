// "At a glance" facts: short, explicit, quotable statements. Shown on /about, used in llms.txt.
// Keep them strictly factual: answer engines lift these verbatim.
import { company, addressLine } from './company';
import { services } from './services';
import { porter } from './porter';
import { founders } from './team';

export const keyFacts: { label: string; value: string }[] = [
  { label: 'What', value: `${company.name} is a robotics engineering company that designs and builds custom robotics systems for businesses.` },
  { label: 'Services', value: services.map((s) => s.title).join(', ') + '.' },
  { label: 'Approach', value: 'Projects are scoped to each client’s requirements and budget, from focused ROS work to complete end-to-end systems, with ongoing support.' },
  { label: 'Product', value: `${porter.name} robot for airport baggage handling, ${porter.status.split('·')[1].trim().toLowerCase()}.` },
  { label: 'Founded', value: `${company.foundingDate.slice(0, 4)}, by five engineers from Rajagiri School of Engineering & Technology, Kochi.` },
  { label: 'Founders', value: founders.map((f) => f.name).join(', ') + '.' },
  { label: 'Location', value: addressLine + '.' },
  { label: 'Contact', value: `${company.email} · ${company.phones[0].display}` },
];
