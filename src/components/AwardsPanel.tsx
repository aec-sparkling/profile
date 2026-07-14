import { awards } from '../data';

export default function AwardsPanel() {
  return (
    <ul className="award-list">
      {awards.map((a, i) => (
        <li key={a} style={{ animationDelay: `${i * 90}ms` }}>
          <span className="star">★</span> {a}
        </li>
      ))}
    </ul>
  );
}
