import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="avatar">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_63_1713)">
            <rect width="36" height="36" rx="18" fill="#E5E7EB" />
            <path
              d="M36 31.491V36.0015H0V31.5075C2.09392 28.7092 4.81186 26.438 7.93768 24.8746C11.0635 23.3111 14.511 22.4986 18.006 22.5015C25.362 22.5015 31.896 26.0325 36 31.491ZM24.003 13.5C24.003 15.0913 23.3709 16.6174 22.2456 17.7426C21.1204 18.8679 19.5943 19.5 18.003 19.5C16.4117 19.5 14.8856 18.8679 13.7604 17.7426C12.6351 16.6174 12.003 15.0913 12.003 13.5C12.003 11.9087 12.6351 10.3826 13.7604 9.25736C14.8856 8.13214 16.4117 7.5 18.003 7.5C19.5943 7.5 21.1204 8.13214 22.2456 9.25736C23.3709 10.3826 24.003 11.9087 24.003 13.5Z"
              fill="#D1D5DB"
            />
          </g>
          <defs>
            <clipPath id="clip0_63_1713">
              <rect width="36" height="36" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <span className="avatar__name">
          Pepe Martinez <span className="avatar__email">pepe22@gmail.com</span>
        </span>
      </div>
    </header>
  );
};
