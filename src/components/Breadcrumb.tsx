import { useLocation, useNavigate } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="text-sm mt-30 text-gray-600 py-2 ml-10 md:ml-30 md:mt-25">
      <span className="cursor-pointer" onClick={() => navigate('/')}>Start</span>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={to}>
            {' > '}
            {isLast ? (
              <span className="font-bold">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => navigate(to)}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
