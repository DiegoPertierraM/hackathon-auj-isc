import { Logo } from '../../icons/Logo';
import './impactLogo.scss';

export const ImpactLogo = () => {
  return (
    <h1 className="logo">
      <Logo className="logo__icon" />

      <span className="logo__text">
        Impact <span className="logo__subtext">Social cup</span>
      </span>
    </h1>
  );
};
